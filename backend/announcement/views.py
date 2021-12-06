from rest_framework import status, generics
from rest_framework.views import APIView


from .models import Announcement
from .serializers import AnnouncementSerializer


class GetAnnouncementListAPI(generics.ListAPIView):
    queryset = Announcement.objects.filter(visible=True)
    serializer_class = AnnouncementSerializer
