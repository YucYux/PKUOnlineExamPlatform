from rest_framework import serializers


class CreateContestSerializer(serializers.Serializer):
    """
    用于序列化前端发过来的创建考试的数据
    """
    title = serializers.CharField()
    description = serializers.CharField()
    start_time = serializers.DateTimeField()
    end_time = serializers.DateTimeField()
    class_info = serializers.IntegerField()


class GetContestRankSerializer(serializers.Serializer):
    """
    用于序列化前端发来的考试id
    """
    contest_id = serializers.IntegerField()