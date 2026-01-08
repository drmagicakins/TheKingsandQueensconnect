from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes, action

from .models import Ad
from .serializers import AdSerializer

from accounts.models import Wallet, CreditTransaction
from ads.models import Ad

from .services import (
    send_ad_payment_received_email,
    notify_admin_of_payment
)

from rest_framework import viewsets, status
from .models import Ad, AdvertPayment
from .serializers import AdSerializer, AdvertPaymentSerializer
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings

from .utils import send_ad_rejection_email


class CreateAdView(generics.CreateAPIView):
    serializer_class = AdSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ApprovedAdsListView(generics.ListAPIView):
    queryset = Ad.objects.filter(is_approved=True, is_paid=True)
    serializer_class = AdSerializer

class UploadPaymentProofView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        ad = Ad.objects.get(pk=pk, user=request.user)

        ad.payment_proof = request.FILES.get('payment_proof')
        ad.save()

        send_ad_payment_received_email(ad)
        notify_admin_of_payment(ad)

        return Response({'message': 'Payment proof uploaded. Email sent.'})

class UserAdsListView(generics.ListAPIView):
    serializer_class = AdSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Ad.objects.filter(user=self.request.user)

class PayWithCreditsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, ad_id):
        ad = Ad.objects.get(id=ad_id, user=request.user)
        wallet = Wallet.objects.get(user=request.user)

        if wallet.balance < ad.price:
            return Response({"error": "Insufficient credits"}, status=400)

        wallet.balance -= ad.price
        wallet.save()

        CreditTransaction.objects.create(
            user=request.user,
            amount=ad.price,
            transaction_type="debit",
            reason=f"Ad payment: {ad.title}"
        )

        ad.is_paid = True
        ad.save()

        return Response({"message": "Ad paid with credits"})

class AdminAdViewSet(viewsets.ModelViewSet):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        ad = self.get_object()
        ad.is_approved = True
        ad.approved_at = timezone.now()
        ad.status = Ad.STATUS_APPROVED
        ad.save()

        # Send email notification to user
        send_mail(
            subject='Your ad has been approved!',
            message=f"Hi {ad.user}, your ad '{ad.title}' is now live.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[ad.user.email]
        )

        return Response({'status': 'Ad approved and user notified.'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        reason = request.data.get('reason', 'No reason provided')
        ad = self.get_object()
        ad.is_approved = False
        ad.status = Ad.STATUS_REJECTED
        ad.save()

        # Send email notification to user
        send_mail(
            subject='Your ad has been rejected',
            message=f"Hi {ad.user}, your ad '{ad.title}' was rejected.\nReason: {reason}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[ad.user.email]
        )

        return Response({'status': 'Ad rejected and user notified.'})

@api_view(['GET'])
@permission_classes([IsAdminUser])
def pending_ads(request):
    ads = Ad.objects.filter(status='submitted')
    data = [
        {
            "id": ad.id,
            "title": ad.title,
            "user": ad.user.email,
            "price": str(ad.price),
            "created_at": ad.created_at,
        }
        for ad in ads
    ]
    return Response(data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def approve_ad(request, ad_id):
    try:
        ad = Ad.objects.get(id=ad_id)
    except Ad.DoesNotExist:
        return Response({"error": "Ad not found"}, status=404)

    ad.status = 'approved'
    ad.is_approved = True
    ad.save()

    return Response({"message": "Ad approved"})

@api_view(['POST'])
@permission_classes([IsAdminUser])
def reject_ad(request, ad_id):
    reason = request.data.get("reason")

    if not reason:
        return Response({"error": "Rejection reason required"}, status=400)

    try:
        ad = Ad.objects.get(id=ad_id)
    except Ad.DoesNotExist:
        return Response({"error": "Ad not found"}, status=404)

    ad.status = 'rejected'
    ad.is_approved = False
    ad.rejection_reason = reason
    ad.save()

    send_ad_rejection_email(
        ad.user.email,
        ad.title,
        reason
    )

    return Response({"message": "Ad rejected"})

