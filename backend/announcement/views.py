from rest_framework import status, generics
from rest_framework.views import APIView


from .models import Announcement
from .serializers import AnnouncementSerializer


"""
因为公告类不属于核心功能，所以没有花太多精力在这上面
且难点在前端，故后端只是先建立一个框架
TODO：
创建公告的接口，只要从序列化器拿到再创建即可
修改公告的接口，同上
返回所有公告的API的精化等
"""

class GetAnnouncementListAPI(generics.ListAPIView):
    """
    用于获取数据库中所有的公告的API
    前端的处理逻辑是拿到之后显示时间上最新的4个
    后续可以由后端来做筛选
    """
    queryset = Announcement.objects.filter(visible=True)
    serializer_class = AnnouncementSerializer
