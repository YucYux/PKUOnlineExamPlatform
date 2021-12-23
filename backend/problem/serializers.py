from rest_framework import serializers

from .models import Problem


# 以下几个都是用于提取前端发来的某个单一数据的序列化器
class GetContestIDSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class GetProblemIDSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class GetProblemTagSerializer(serializers.Serializer):
    tag = serializers.CharField()


class GetProblemTitleSerializer(serializers.Serializer):
    name = serializers.CharField()


class ProblemListSerializer(serializers.ModelSerializer):
    """
    用于序列化题目信息
    """
    class Meta:
        model = Problem
        fields = "__all__"


class AddProblemToContestSerializer(serializers.Serializer):
    """
    用于序列化添加题目的数据
    """
    contest_id = serializers.IntegerField()
    problem_ids = serializers.ListSerializer(child=serializers.IntegerField())