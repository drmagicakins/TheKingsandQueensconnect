from django.db import models
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=100)

class Thread(models.Model):
    author = models.ForeignKey("accounts.User", on_delete=models.CASCADE, related_name='community_threads')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Reply(models.Model):
    thread = models.ForeignKey(Thread, related_name="replies", on_delete=models.CASCADE)
    author = models.ForeignKey("accounts.User", on_delete=models.CASCADE, related_name='community_replies')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class CreditWallet(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    balance = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)


