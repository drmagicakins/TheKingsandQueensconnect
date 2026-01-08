from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Ad(models.Model):
    STATUS_DRAFT = 'draft'
    STATUS_SUBMITTED = 'submitted'
    STATUS_APPROVED = 'approved'
    STATUS_REJECTED = 'rejected'
    STATUS_EXPIRED = 'expired'

    STATUS_CHOICES = (
        (STATUS_DRAFT, 'Draft'),
        (STATUS_SUBMITTED, 'Submitted'),
        (STATUS_APPROVED, 'Approved'),
        (STATUS_REJECTED, 'Rejected'),
        (STATUS_EXPIRED, 'Expired'),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='ads'
    )

    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='ads/', blank=True, null=True)
    link = models.URLField(blank=True)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_DRAFT
    )

    price = models.DecimalField(max_digits=10, decimal_places=2)

    is_approved = models.BooleanField(default=False)
    is_paid = models.BooleanField(default=False)
    expires_at = models.DateTimeField()

    approved_at = models.DateTimeField(blank=True, null=True)
    rejection_reason = models.TextField(blank=True, null=True)
    paid_at = models.DateTimeField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} | {self.user}"

    @property
    def ad_status(self):
        if not self.is_paid:
            return "Pending Payment"
        if self.is_paid and not self.is_approved:
            return "Under Review"
        if self.is_paid and self.is_approved:
            return "Live"

class AdvertPayment(models.Model):
    ad = models.OneToOneField(
        Ad,
        on_delete=models.CASCADE,
        related_name='payment'
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    reference = models.CharField(max_length=100)
    payment_proof = models.ImageField(upload_to='ads/payments/')
    confirmed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment for {self.ad.title} | {self.amount}"
