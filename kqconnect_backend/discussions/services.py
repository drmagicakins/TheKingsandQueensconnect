from django.utils import timezone
from datetime import timedelta
from .models import Thread

def get_trending_threads(hours=24):
    since = timezone.now() - timedelta(hours=hours)

    threads = Thread.objects.filter(created_at__gte=since)

    def score(thread):
        age_hours = max((timezone.now() - thread.created_at).seconds / 3600, 1)
        return (thread.likes * 2 + thread.replies.count() + thread.views) / age_hours

    return sorted(threads, key=score, reverse=True)
