from accounts.services import get_tomorrow_birthdays
from accounts.email_services import send_admin_birthday_email

from notifications.services import create_notification
from community.models import CreditWallet
from community.services import award_credits


def run_birthday_check():
    birthdays = get_tomorrow_birthdays()
    send_admin_birthday_email(birthdays)

def daily_birthday_job():
    birthdays = get_tomorrow_birthdays()

    # 1️⃣ Email admin
    send_admin_birthday_email(birthdays)

    for user in birthdays:
        # 2️⃣ Notify member
        create_notification(
            user=user,
            title="🎉 Birthday Tomorrow!",
            message="The Kings & Queens Connect celebrates you tomorrow!"
        )

        # 3️⃣ Award birthday credits
        wallet, _ = CreditWallet.objects.get_or_create(user=user)
        award_credits(wallet, amount=10)


