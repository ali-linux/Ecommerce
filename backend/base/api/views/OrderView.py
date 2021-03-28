from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Order, OrderItem, ShippingAddress
from rest_framework import status
from ..serializers.OrderSerializers import OrderSerializer
from datetime import datetime
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
  user = request.user
  data = request.data
  orderItems = data['orderItems']
  if orderItems and len(orderItems) == 0:
    return Response({'detail': 'no order'}, status=status.HTTP_400_BAD_REQUEST)
  else:
    # CREATE ORDER
    order = Order.objects.create(
      user          = user,
      paymentMethod = data['paymentMethod'],
      taxPrice      = data['taxPrice'],
      shippingPrice = data['shippingPrice'],
      totalPrice    = data['totalPrice']
      )
      # Shipping Address
    shipping = ShippingAddress.objects.create(
      order=order,
      address=data['shippingAddress']['address'],
      city = data['shippingAddress']['city'],
      postalCode=data['shippingAddress']['postalCode'],
      country = data['shippingAddress']['country']
    )

    # CREATE ORDER ITEMS AND SET ORDER TO ORDERITEM RELATIONSHIP
    for i in orderItems: 
      product = Product.objects.get(_id=i['product'])
      
      item = OrderItem.objects.create(
        product=product,
        order=order,
        name=product.name,
        qty=i['qty'],
        price=i['price'],
        image = product.image.url,
      )

      # update stock
      product.countInStock -= item.qty
      product.save()
      
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
  user = request.user

  try:
    order = Order.objects.get(_id=pk)
    if user.is_staff or order.user == user:
      serializer = OrderSerializer(order, many=False)
      return Response(serializer.data)
    else:
      return Response({'details': 'Not Auhtorized'}, status=status.HTTP_401_UNAUTHORIZED)
  except Exception:
    return Response({'details':'Order not found'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request,pk):
  order = Order.objects.get(_id=pk)

  order.isPaid = True
  order.paidAt = datetime.now()
  order.save()
  return Response({'detail': 'order is paid'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrders(request):
  user = request.user
  orders = user.order_set.all()
  serializer = OrderSerializer(orders, many=True)
  return Response(serializer.data)
