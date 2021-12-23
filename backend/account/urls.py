from django.urls import path, re_path
from .views import UserRegisterAPI, UserLogoutAPI, GetUserInfoAPI, \
    GetClassListAPI, GetUserListFromClassAPI, SetUserClassAPI, SetUserTAAPI, \
    EditUserProfileAPI
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('register/', UserRegisterAPI.as_view(), name='user_register_api'),
    path('login/', TokenObtainPairView.as_view(), name='user_login_api'),
    path('login/refresh/', TokenRefreshView.as_view(), name='user_refresh_token_api'),
    path('logout/', UserLogoutAPI.as_view(), name='user_logout_api'),

    path('usertype/', GetUserInfoAPI.as_view(), name='get_user_type_api'),
    path('edituserprofile/', EditUserProfileAPI.as_view(), name='edit_user_profile_api'),

    path('getclasslist/', GetClassListAPI.as_view(), name='get_class_list_api'),
    re_path(r'^getuserlist/$', GetUserListFromClassAPI.as_view(), name='get_user_list_api'),
    path('setuserclass/', SetUserClassAPI.as_view(), name='set_user_class_api'),
    path('setuserta/', SetUserTAAPI.as_view(), name='set_user_as_ta_api')
]