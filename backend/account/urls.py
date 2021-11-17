from django.urls import path
from .views import UserRegisterAPI, UserLogoutAPI, GetUserInfoAPI, GetClassListAPI
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', UserRegisterAPI.as_view(), name='user_register_api'),
    path('login/', TokenObtainPairView.as_view(), name='user_login_api'),
    path('login/refresh/', TokenRefreshView.as_view(), name='user_refresh_token_api'),
    path('logout/', UserLogoutAPI.as_view(), name='user_logout_api'),
    path('usertype/', GetUserInfoAPI.as_view(), name='get_user_type_api'),
    path('getclasslist/', GetClassListAPI.as_view(), name='get_class_list')
]