from django.db import models

class Credit(models.Model):
    user = models.OneToOneField("accounts.User", on_delete=models.CASCADE)
    balance = models.IntegerField(default=0)

class CreditLog(models.Model):
    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    amount = models.IntegerField()
    reason = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

