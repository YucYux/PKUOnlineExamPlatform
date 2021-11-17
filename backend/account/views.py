from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.filters import SearchFilter
from django.http import JsonResponse
from django.contrib import auth

from .serializers import UserRegisterSerializer, ClassListSerializer, \
    UserListSerializer, SetUserClassSerialize
from .models import Class, User


class UserRegisterAPI(APIView):
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
    def get(self, request):
        auth.logout(request)
        return Response(status=status.HTTP_200_OK)


def getUserFromRequest(request):
    return request.successful_authenticator.get_user(
        request.successful_authenticator.get_validated_token(
            request.successful_authenticator.get_raw_token(
                request.successful_authenticator.get_header(request))))


class GetUserInfoAPI(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = getUserFromRequest(request)
        return JsonResponse({'username': user.username,
                             'class_id': user.class_info,
                             'admin_type': user.admin_type},
                            status=status.HTTP_200_OK)


class GetClassListAPI(generics.ListAPIView):
    queryset = Class.objects.all()
    serializer_class = ClassListSerializer


class GetUserListFromClassAPI(generics.ListAPIView):
    permission_classes = (IsAdminUser,)

    queryset = User.objects.all()
    serializer_class = UserListSerializer
    filter_backends = [SearchFilter]
    search_fields = ['class_info']


class SetUserClass(APIView):
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


class SetUserTA(APIView):
    permission_classes = (IsAdminUser,)

    def post(self, request):
        serializer = SetUserClassSerialize(data=request.data)
        if serializer.is_valid():
            user = User.objects.get(id=serializer.data["user_id"])
            user.class_info = serializer.data["new_class_id"]
            user.admin_type = "Teaching Assistant"
            user.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)