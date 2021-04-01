from django.urls import path
from ..views import OrderView as views

urlpatterns = [
  path(
    'add/order',
    views.addOrderItems,
    name='add-order'
  ),
  path(
    'order/myorders',
    views.getOrders,
    name='myorders'
  ),
  
  path(
    'orders',
    views.getAllOrders,
    name='myorders'
  ),
  path(
    'order/<str:pk>',
    views.getOrderById,
    name='user-order'
  ),
  path(
    'order/delivered/<str:pk>',
    views.updateOrderToDelivered,
    name='deliver-order'
  ),
  path(
    'order/<str:pk>/pay',
    views.updateOrderToPaid,
    name='pay-order'
  ),
]
