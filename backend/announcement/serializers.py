from rest_framework import serializers

from .models import Announcement


class CreateAnnouncementSerializer(serializers.Serializer):
    """
    用于序列化前端发过来的创建公告的数据
    """
    title = serializers.CharField(max_length=100)
    content = serializers.CharField(max_length=1024 * 1024 * 8)
    visible = serializers.BooleanField()


class AnnouncementSerializer(serializers.ModelSerializer):
    """
    返回序列化的公告的信息
    """
    class Meta:
        model = Announcement
        fields = "__all__"


class EditAnnouncementSerializer(serializers.Serializer):
    """
    用于序列化前端发过来的修改公告的数据
    """
    id = serializers.IntegerField()
    title = serializers.CharField(max_length=64)
    content = serializers.CharField(max_length=1024 * 1024 * 8)
    visible = serializers.BooleanField()
