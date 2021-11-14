from django.urls import path
from .views import UserRegisterAPI, UserLoginAPI, UserLogoutAPI, HelloAPI
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', UserRegisterAPI.as_view(), name='user_register_api'),
    path('login/', TokenObtainPairView.as_view(), name='user_login_api'),
    path('login/refresh/', TokenRefreshView.as_view(), name='user_refresh_token_api'),
    path('logout/', UserLogoutAPI.as_view(), name='user_logout_api'),
    path('hello/', HelloAPI.as_view(), name='test_token_api')
]