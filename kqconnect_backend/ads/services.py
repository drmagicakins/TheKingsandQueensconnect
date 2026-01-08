from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone
from .models import Ad


def send_ad_payment_received_email(ad):
    subject = "Payment Received – Pending Approval"
    message = f"""
Hello {ad.user.username},

We have received your payment proof for the advert:

Title: {ad.title}
Amount: ₦{ad.price}

Our admin team will review and approve your advert shortly.

Thank you for supporting The Kings & Queens Connect.
"""

    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [ad.user.email],
        fail_silently=False,
    )


def notify_admin_of_payment(ad):
    subject = "New Advert Payment Submitted"
    message = f"""
A new advert payment proof has been submitted.

User: {ad.user.username}
Email: {ad.user.email}
Title: {ad.title}
Amount: ₦{ad.price}

Please review and approve in the admin panel.
"""

    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [settings.ADMIN_EMAIL],
        fail_silently=False,
    )

def expire_ads():
    now = timezone.now()

    expired_ads = Ad.objects.filter(
        expires_at__lt=now,
        status__in=['approved', 'submitted']
    )

    count = expired_ads.update(
        status='expired',
        is_approved=False
    )

    return count
