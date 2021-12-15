from rest_framework import serializers

from .models import Submission


class SubmitSerializer(serializers.Serializer):
    code = serializers.CharField()
    contest_id = serializers.IntegerField()
    problem_id = serializers.CharField()


class GetSubmissionSerializer(serializers.Serializer):
    contest_id = serializers.IntegerField()
    problem_id = serializers.CharField()