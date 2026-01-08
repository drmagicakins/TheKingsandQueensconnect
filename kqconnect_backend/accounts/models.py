from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from .managers import UserManager
from django.utils.timezone import now

class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('ADMIN', 'Admin'),
        ('MEMBER', 'Member'),
    )

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='MEMBER')
    last_seen = models.DateTimeField(default=now)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_banned = models.BooleanField(default=False)
    is_suspended = models.BooleanField(default=False)
    birthday = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email
    
class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} — {self.balance} credits"
    
class CreditTransaction(models.Model):
    CREDIT = "credit"
    DEBIT = "debit"

    TYPE_CHOICES = [
        (CREDIT, "Credit"),
        (DEBIT, "Debit"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField()
    transaction_type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    reason = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

