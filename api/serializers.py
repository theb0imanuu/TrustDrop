from rest_framework import serializers
from .models import Order, DeliveryCode

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class DeliveryCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryCode
        fields = '__all__'
