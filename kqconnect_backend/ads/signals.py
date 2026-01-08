from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import AdvertPayment, Ad
from django.core.mail import send_mail
from django.conf import settings

@receiver(post_save, sender=AdvertPayment)
def handle_payment_confirmation(sender, instance, created, **kwargs):
    if instance.confirmed:
        # Update the related Ad
        ad = instance.advert
        ad.is_paid = True
        ad.status = Ad.STATUS_SUBMITTED  # Under Review
        ad.save()

        # Notify admin
        send_mail(
            subject=f"Ad Payment Confirmed: {ad.title}",
            message=f"The ad '{ad.title}' by {ad.user} has been paid and is ready for review.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.DEFAULT_FROM_EMAIL],  # Admin email
        )
        