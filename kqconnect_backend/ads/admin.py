from django.contrib import admin
from .models import Ad
from django.utils.timezone import now

@admin.register(Ad)
class AdAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'user',
        'price',
        'is_paid',
        'is_approved',
        'created_at'
    )

    list_filter = ('is_paid', 'is_approved')
    search_fields = ('title', 'user__username')

    actions = ['mark_as_paid_and_approved']

    def mark_as_paid_and_approved(self, request, queryset):
        queryset.update(
            is_paid=True,
            is_approved=True,
            paid_at=now(),
            approved_at=now()
        )
    mark_as_paid_and_approved.short_description = "Mark selected ads as paid and approved"