from rest_framework import serializers

from .models import Submission


class SubmitSerializer(serializers.Serializer):
    """
    用于序列化前端发来的提交数据
    """
    code = serializers.CharField()
    contest_id = serializers.IntegerField()
    problem_id = serializers.CharField()


class GetSubmissionSerializer(serializers.Serializer):
    """
    用于序列化前端发来的用于查询提交的数据
    """
    contest_id = serializers.IntegerField()
    problem_id = serializers.CharField()