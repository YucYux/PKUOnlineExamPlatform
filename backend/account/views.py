from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserRegisterSerializer
from django.contrib import auth


class UserRegisterAPI(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginAPI(APIView):
    def post(self, request):
        data = request.data
        user = auth.authenticate(username=data["username"], password=data["password"])
        if user is not None and user.is_active:
            auth.login(request, user)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserLogoutAPI(APIView):
    def get(self, request):
        auth.logout(request)
        return Response(status=status.HTTP_200_OK)

class HelloAPI(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        username = request.successful_authenticator.get_user(request.successful_authenticator.get_validated_token(request.successful_authenticator.get_raw_token(request.successful_authenticator.get_header(request))))
        return Response(username.admin_type, status=status.HTTP_200_OK)
