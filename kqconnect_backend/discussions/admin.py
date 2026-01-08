from django.contrib import admin
from .models import Report


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "reason",
        "reporter",
        "question",
        "answer",
        "resolved",
        "created_at",
    )
    list_filter = ("reason", "resolved")
    search_fields = ("comment",)
