from datetime import date, timedelta
from .models import User

def get_tomorrow_birthdays():
    tomorrow = date.today() + timedelta(days=1)
    return User.objects.filter(
        birthday__month=tomorrow.month,
        birthday__day=tomorrow.day,
        is_active=True,
        is_banned=False,
    )
