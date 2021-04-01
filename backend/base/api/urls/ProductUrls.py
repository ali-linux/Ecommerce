from django.urls import path
from ..views import ProductView as views

urlpatterns = [
  path(
    'products/',
    views.getProducts,
    name='products'
  ),
   path(
    'products/create/',
    views.createProduct,
    name='create-product'
  ),
  path(
    'products/upload/',
    views.uploadImage,
    name='image-product'
  ),
  path(
    'products/<int:pk>/',
    views.getProduct,
    name='product'
  ),
  path(
    'products/top/',
    views.getTopProducts,
    name='top-products'
  ),
   path(
    'products/<str:pk>/reviews/',
    views.createProductReview,
    name='product-review'
  ),
  path(
    'products/delete/<int:pk>/',
    views.deleteProduct,
    name='delete-product'
  ),
   path(
    'products/update/<int:pk>/',
    views.updateProduct,
    name='update-product'
  ),
]
