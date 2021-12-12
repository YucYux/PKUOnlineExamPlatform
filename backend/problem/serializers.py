from rest_framework import serializers

from .models import Problem


class GetContestIDSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class GetProblemIDSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class GetProblemTagSerializer(serializers.Serializer):
    tag = serializers.CharField()


class GetProblemTitleSerializer(serializers.Serializer):
    name = serializers.CharField()


class ProblemListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = "__all__"


class AddProblemToContestSerializer(serializers.Serializer):
    contest_id = serializers.IntegerField()
    problem_ids = serializers.ListSerializer(child=serializers.IntegerField())