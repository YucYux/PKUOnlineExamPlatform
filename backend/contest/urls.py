from django.conf.urls import url, include
from django.urls import path
# from django.contrib import admin
# from rest_framework.routers import DefaultRouter
# from ..contest import views
from contest.views import ContestAccessAPI, ContestRankAPI,ContestAPI,ContestListAPI,ContestAdminAPI,DownloadContestSubmissions

# router = DefaultRouter()
# router.register(r'contest', views.ContestViewSet)

urlpatterns = [
    url(r"^contests/?$", ContestListAPI.as_view(), name="contest_list_api"),
    url(r"^contest/?$", ContestAPI.as_view(), name='contest_api'),
    url(r"^contest/access/?$", ContestAccessAPI.as_view(), name="contest_access_api"),
    url(r"^contest_rank/?$", ContestRankAPI.as_view(), name="contest_rank_api"),
    url(r"^admin/?$",ContestAdminAPI.as_view(),name='contest_admin_api'),
    url(r"^download_submissions/?$", DownloadContestSubmissions.as_view(), name="acm_contest_helper")
]