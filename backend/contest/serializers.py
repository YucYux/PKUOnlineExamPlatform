from rest_framework import serializers
from .models import Contest,ContestRank
from django.db import models


class UsernameSerializer(serializers.Serializer):
    admin_type = models.TextField()
    student_name = models.CharField()


class ContestAdminSerializer(serializers.ModelSerializer):
    created_by = UsernameSerializer()

    class Meta:
        model = Contest
        fields = '__all__'


class CreateConetestSeriaizer(serializers.Serializer):
    title = serializers.CharField(max_length=128)
    description = serializers.CharField()
    start_time = serializers.DateTimeField()
    end_time = serializers.DateTimeField()
    visible = serializers.BooleanField()


class EditConetestSeriaizer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField(max_length=128)
    description = serializers.CharField()
    start_time = serializers.DateTimeField()
    end_time = serializers.DateTimeField()
    visible = serializers.BooleanField()


class ContestSerializer(ContestAdminSerializer):
    class Meta:
        model = Contest
        exclude = ("password", "visible", "allowed_ip_ranges")

class ContestRankSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = ContestRank
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        self.is_contest_admin = kwargs.pop("is_contest_admin", False)
        super().__init__(*args, **kwargs)

    def get_user(self, obj):
        return UsernameSerializer(obj.user).data

