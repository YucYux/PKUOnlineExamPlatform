from django.urls import path
from .views import GetContestListAPI, CreateContestAPI, GetContestRankAPI, \
    GetEndedContestListAPI


urlpatterns = [
    path("getcontestlist/", GetContestListAPI.as_view(), name='get_contest_list_api'),
    path("createcontest/", CreateContestAPI.as_view(), name='create_contest_api'),
    path("getcontestrank/", GetContestRankAPI.as_view(), name='get_contest_rank_api'),
    path("getendedcontest/", GetEndedContestListAPI.as_view(), name='get_ended_contest_api')
]