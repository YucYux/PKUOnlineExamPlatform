from rest_framework import serializers

from .models import Announcement


class CreateAnnouncementSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    content = serializers.CharField(max_length=1024 * 1024 * 8)
    visible = serializers.BooleanField()


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = "__all__"


class EditAnnouncementSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField(max_length=64)
    content = serializers.CharField(max_length=1024 * 1024 * 8)
    visible = serializers.BooleanField()