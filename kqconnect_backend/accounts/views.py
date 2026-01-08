##from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated

from rest_framework.generics import ListAPIView
from .permissions import IsAdmin
from .models import User, Wallet

from accounts.services import get_tomorrow_birthdays


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        refresh = RefreshToken.for_user(user)

        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'role': user.role,
            'email': user.email,
        })

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class MemberListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

class BanUserView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def post(self, request, user_id):
        user = User.objects.get(id=user_id)
        user.is_banned = True
        user.is_active = False
        user.save()
        return Response({"message": "User banned"})

class AdminBirthdayPreviewView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        birthdays = get_tomorrow_birthdays()
        serializer = UserSerializer(birthdays, many=True)
        return Response(serializer.data)

## birthdays = get_tomorrow_birthdays()

class WalletView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wallet = Wallet.objects.get(user=request.user)
        return Response({"balance": wallet.balance})
    def post(self, request):
        amount = request.data.get("amount", 0)
        wallet = Wallet.objects.get(user=request.user)
        wallet.balance += amount
        wallet.save()
        return Response({"balance": wallet.balance})

