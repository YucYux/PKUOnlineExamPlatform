from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from ..contest import views


router = DefaultRouter()
router.register(r'contest', views.ContestViewSet)

urlpatterns = [
    url(r'contest', include(router.urls)),
    url(r"^contest/announcement/?$", ContestAnnouncementListAPI.as_view(), name="contest_announcement_api"),
    url(r"^contest/access/?$", ContestAccessAPI.as_view(), name="contest_access_api"),
    url(r"^contest_rank/?$", ContestRankAPI.as_view(), name="contest_rank_api"),
]