from django.urls import path
from ..views import AccountView as views

urlpatterns = [
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
  path(
    'user/profile/update',
    views.updateUserProfile,
    name='user-profile-update'
  ),
    # path('user/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
