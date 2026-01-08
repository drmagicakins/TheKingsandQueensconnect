from django.utils.timezone import now, timedelta
from accounts.models import User

def get_active_users(minutes=5):
    threshold = now() - timedelta(minutes=minutes)
    return User.objects.filter(last_seen__gte=threshold)
