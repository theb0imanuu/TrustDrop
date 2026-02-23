from django.urls import path
from .views import OrderDispatchView, CodeVerificationView

urlpatterns = [
    path('dispatch/', OrderDispatchView.as_view(), name='order-dispatch'),
    path('verify/', CodeVerificationView.as_view(), name='code-verification'),
]
