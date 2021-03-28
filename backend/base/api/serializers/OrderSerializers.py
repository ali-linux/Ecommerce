from rest_framework import serializers
from base.models import Order,OrderItem,ShippingAddress
from .AccountSerializers import UserSerializer
class ShippingAddressSerializer(serializers.ModelSerializer):
  class Meta:
    model = ShippingAddress
    fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = OrderItem
    fields = '__all__'
    
class OrderSerializer(serializers.ModelSerializer):
  orderItems= serializers.SerializerMethodField(read_only = True)
  shippingAddress = serializers.SerializerMethodField(read_only=True)
  user = serializers.SerializerMethodField(read_only=True)
  class Meta:
    model = Order
    fields = '__all__'
  def get_orderItems(self, obj):
    items = obj.orderitem_set.all()
    serializer = OrderItemSerializer(items,many=True)
    return serializer.data
  def get_shippingAddress(self, obj):
    try:
      address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
    except Exception:
      address = False
    return address
  def get_user(self, obj):
    user = obj.user
    serializer = UserSerializer(user,many=False)
    return serializer.data
