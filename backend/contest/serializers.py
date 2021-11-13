from rest_framework import serializers
from ..contest.models import Contest
from django.db import models

class UsernameSerializer(serializers.Serializer):
    admin_type = models.TextField()
    student_name = models.CharField()


class ContestAdminSerializer(serializers.ModelSerializer):
    created_by = UsernameSerializer()

    class Meta:
        model = Contest
        fields = '__all__'
