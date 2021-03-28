from django.urls import path
from . import views

# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )


urlpatterns = [
  path(
    'products/',
    views.getProducts,
    name='products'
  ),
  path(
    'products/<int:pk>/',
    views.getProduct,
    name='product'
  ),
  path(
    'user/login/',
    views.MyTokenObtainPairView.as_view(),
    name='token_obtain_pair'
  ),
  path(
    'user/signup/',
    views.SignupView,
    name='signupView'
  ),
  path(
    'user/profile',
    views.getUserProfile,
    name='userProfile'
  ),
  path(
    'users',
    views.getUsers,
    name='users'
  ),
    # path('user/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
