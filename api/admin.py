from django.contrib import admin
from .models import Order, DeliveryCode

admin.site.register(Order)
admin.site.register(DeliveryCode)