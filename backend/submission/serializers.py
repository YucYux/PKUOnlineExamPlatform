from django import forms
from rest_framework import serializers

from .models import Submission


class SubmissionSerializer(serializers.ModelSerializer):
    problem = serializers.SlugRelatedField(read_only=True, slug_field="_id")
    user = serializers.SlugRelatedField(read_only=True, slug_field='student_name')

    class Meta:
        model = Submission
        field = ("code", "sub_time", "result")