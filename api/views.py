from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, DeliveryCode
from .serializers import OrderSerializer
import africastalking
from django.conf import settings
from rest_framework.permissions import AllowAny


# Initialize Africa's Talking
username = settings.AFRICASTALKING_USERNAME
api_key = settings.AFRICASTALKING_API_KEY
africastalking.initialize(username, api_key)
sms = africastalking.SMS

class OrderDispatchView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save()
            delivery_code = DeliveryCode.objects.create(order=order)
            
            # Send SMS
            try:
                response = sms.send(
                    f"Your delivery code for order {order.id} is {delivery_code.code}",
                    [order.customer_phone],
                    "31315"
                )
                print(response)
            except Exception as e:
                return Response({'error': f"Error sending SMS: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CodeVerificationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        code = request.data.get('code')
        if not code:
            return Response({'error': 'Code not provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            delivery_code = DeliveryCode.objects.get(code=code, is_valid=True)
            order = delivery_code.order
            order.status = 'delivered'
            order.save()
            delivery_code.is_valid = False
            delivery_code.save()
            return Response({'message': 'Order delivered successfully'}, status=status.HTTP_200_OK)
        except DeliveryCode.DoesNotExist:
            return Response({'error': 'Invalid code'}, status=status.HTTP_400_BAD_REQUEST)