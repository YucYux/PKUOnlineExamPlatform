from django.urls import path, re_path

from .views import GetProblemFromContestAPI, GetProblemDetailAPI, \
    GetProblemListAPI, SearchProblemByNameAPI, SearchProblemByIDAPI, \
    SearchProblemByTagAPI

urlpatterns = [
    path('getproblemlistfromcontest/', GetProblemFromContestAPI.as_view(), name='get_problem_list_from_contest_api'),
    path('getproblemdetail/', GetProblemDetailAPI.as_view(), name='get_problem_detail_api'),
    path('getproblemlist/', GetProblemListAPI.as_view(), name='get_problem_list_api'),
    path('searchproblem/id/', SearchProblemByIDAPI.as_view(), name='search_problem_by_id__api'),
    path('searchproblem/tag/', SearchProblemByTagAPI.as_view(), name='search_problem_by_tag_api'),
    path('searchproblem/name/', SearchProblemByNameAPI.as_view(), name='search_problem_by_name_api'),

]