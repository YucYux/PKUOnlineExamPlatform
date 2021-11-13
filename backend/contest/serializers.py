from rest_framework import serializers
from .models import Contest

class ContestAdminSerializer(serializers.ModelSerializer):
    created_by = UsernameSerializer()
    status = serializers.CharField()
    contest_type = serializers.CharField()
    model = Contest
    fields = "__all__"