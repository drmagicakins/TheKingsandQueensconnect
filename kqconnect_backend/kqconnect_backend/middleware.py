from django.core.cache import cache
from django.utils.timezone import now

class ActiveUserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            cache.set(
                f"active_{request.user.id}",
                now().isoformat(),
                timeout=300  # 5 minutes
            )
        return self.get_response(request)
