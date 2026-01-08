from django.core.mail import send_mail
from django.conf import settings

def send_admin_birthday_email(birthdays):
    if not birthdays.exists():
        return

    subject = "🎉 Upcoming Birthdays – Kings & Queens Connect"
    
    message_lines = [
        "The following members have birthdays tomorrow:\n"
    ]

    for user in birthdays:
        message_lines.append(f"- {user.username} ({user.email})")

    message = "\n".join(message_lines)

    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=["drmagicakins@gmail.com"],
        fail_silently=False,
    )
