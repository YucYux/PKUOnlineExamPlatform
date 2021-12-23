from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.filters import SearchFilter
from django.http import JsonResponse
from django.contrib import auth

from .serializers import UserRegisterSerializer, ClassListSerializer, \
    UserListSerializer, SetUserClassSerialize, EditUserProfileSerializer
from .models import Class, User, AdminType


"""
views整体说明：
因为使用了DRF的框架，所以与前端交互时需要进行交互的数据要先在Serializers.py中定义好，然后再在API中调用
DRF的代码逻辑可读性较强，所以后续注释中没有对每个接口的具体行为进行一一说明
考虑到班级的创建应该是超级管理员做的事情，所以我们将Class的创建集成到了admin里，即在纯后端创建，没有进行前后端的交互
"""

class UserRegisterAPI(APIView):
    """
    用于创建用户
    User的Create集成在了序列化器里
    """
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


'''
已用simple jwt自带的用户登录函数代替
class UserLoginAPI(APIView):
    def post(self, request):
        data = request.data
        user = auth.authenticate(username=data["username"], password=data["password"])
        if user is not None and user.is_active:
            auth.login(request, user)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
'''


class UserLogoutAPI(APIView):
    """
    疑惑：simple jwt似乎没有用于登出的函数
    这里的处理是通过auth登出，这样再登陆的时候会拿到新的token，所以不用simple jwt的登出应该也没事
    """
    def get(self, request):
        auth.logout(request)
        return Response(status=status.HTTP_200_OK)


def getUserFromRequest(request):
    """
    该函数用于从前端发来的请求中Header中包括的token信息来确定是哪个User
    因为本项目中所有需要确定是哪个User的接口都需要调用该函数
    """
    return request.successful_authenticator.get_user(
        request.successful_authenticator.get_validated_token(
            request.successful_authenticator.get_raw_token(
                request.successful_authenticator.get_header(request))))


class GetUserInfoAPI(APIView):
    """
    返回具体用户的信息
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = getUserFromRequest(request)
        return JsonResponse({'username': user.username,
                             'student_name': user.student_name,
                             'student_number': user.student_number,
                             'class_id': user.class_info,
                             'admin_type': user.admin_type},
                            status=status.HTTP_200_OK)


class GetClassListAPI(generics.ListAPIView):
    """
    返回所有班级的列表
    """
    queryset = Class.objects.all()
    serializer_class = ClassListSerializer


class GetUserListFromClassAPI(generics.ListAPIView):
    """
    获取班级中的所有用户
    """
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    filter_backends = [SearchFilter]
    search_fields = ['class_info']


class SetUserClassAPI(APIView):
    """
    为用户设置班级
    """
    permission_classes = (IsAdminUser,)

    def post(self, request):
        serializer = SetUserClassSerialize(data=request.data)
        if serializer.is_valid():
            user = User.objects.get(id=serializer.data["user_id"])
            user.class_info = serializer.data["new_class_id"]
            user.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SetUserTAAPI(APIView):
    """
    设置某用户为助教
    """
    permission_classes = (IsAdminUser,)

    def post(self, request):
        serializer = SetUserClassSerialize(data=request.data)
        if serializer.is_valid():
            user = User.objects.get(id=serializer.data["user_id"])
            user.class_info = serializer.data["new_class_id"]
            user.admin_type = AdminType.TEACHING_ASSISTANT
            user.is_staff = True
            user.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditUserProfileAPI(APIView):
    """
    修改用户信息
    """
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = EditUserProfileSerializer(data=request.data)
        if serializer.is_valid():
            user = getUserFromRequest(request)
            if serializer.data["student_name"] is not None:
                user.student_name = serializer.data["student_name"]
            if serializer.data["student_number"] is not None:
                user.student_number = serializer.data["student_number"]
            user.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)