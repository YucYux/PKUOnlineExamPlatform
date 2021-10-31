from django.urls import path
from .views import UserRegisterAPI, UserLoginAPI, UserLogoutAPI

urlpatterns = [
    path('register/', UserRegisterAPI.as_view(), name='user_register_api'),
    path('login/', UserLoginAPI.as_view(), name='user_login_api'),
    path('logout/', UserLogoutAPI.as_view(), name='user_logout_api')
]