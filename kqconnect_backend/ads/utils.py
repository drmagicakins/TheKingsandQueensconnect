from django.core.mail import send_mail
from django.conf import settings


def send_ad_rejection_email(user_email, title, reason):
    send_mail(
        subject="Your Ad Was Rejected",
        message=f"""
Hello,

Your advert titled "{title}" was reviewed and rejected.

Reason:
{reason}

You may edit and resubmit the advert.

— The Kings & Queens Team
""",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user_email],
        fail_silently=False,
    )
