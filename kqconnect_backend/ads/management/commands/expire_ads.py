from django.core.management.base import BaseCommand
from ads.services import expire_ads


class Command(BaseCommand):
    help = "Expire ads past their expiration date"

    def handle(self, *args, **kwargs):
        count = expire_ads()
        self.stdout.write(self.style.SUCCESS(
            f"{count} ads expired successfully"
        ))
