from rest_framework import serializers
from .models import User, Class


class UserRegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )


'''
已用simple jwt自带的用户登录函数代替
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    admin_Type = serializers.CharField()
'''


class ClassListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = "__all__"


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "student_name", "student_number", "admin_type", "class_info"]


class SetUserClassSerialize(serializers.Serializer):
    user_id = serializers.IntegerField()
    new_class_id = serializers.IntegerField()


class EditUserProfileSerializer(serializers.Serializer):
    student_name = serializers.CharField(allow_blank=True)
    student_number = serializers.CharField(allow_blank=True)