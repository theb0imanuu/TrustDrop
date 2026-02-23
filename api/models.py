from django.db import models
import random
import string

class Order(models.Model):
    ORDER_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('dispatched', 'Dispatched'),
        ('delivered', 'Delivered'),
    ]
    customer_name = models.CharField(max_length=255)
    customer_phone = models.CharField(max_length=20)
    location = models.CharField(max_length=255, default='Unknown')
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} for {self.customer_name}"

def generate_delivery_code():
    """Generate a random 6-digit code."""
    return ''.join(random.choices(string.digits, k=6))

class DeliveryCode(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    code = models.CharField(max_length=6, default=generate_delivery_code)
    is_valid = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Code {self.code} for Order {self.order.id}"