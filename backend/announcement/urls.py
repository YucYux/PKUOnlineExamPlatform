from django.urls import path

from .views import GetAnnouncementListAPI

urlpatterns = [
    path('getannouncementlist/', GetAnnouncementListAPI.as_view(), name='get_announcement_list_api'),
]