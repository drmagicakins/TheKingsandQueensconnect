from rest_framework import serializers
from .models import Ad, AdvertPayment

class AdvertPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdvertPayment
        fields = ['id', 'ad', 'amount', 'reference', 'payment_proof', 'confirmed', 'created_at']

class AdSerializer(serializers.ModelSerializer):
    payment = AdvertPaymentSerializer(read_only=True)

    class Meta:
        model = Ad
        fields = [
            'id', 'user', 'title', 'description', 'image', 'link',
            'status', 'is_approved', 'approved_at', 'ad_status', 'payment', 'created_at'
        ]
