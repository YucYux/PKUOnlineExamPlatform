from django.urls import path

from .views import SubmitAPI, GetSubmissionAPI, ContestSubmissionAPI, \
    ProblemSubmissionAPI, UserSubmissionAPI

urlpatterns = [
    path('submit/', SubmitAPI.as_view(), name="submit_api"),
    path('getsubmission/', GetSubmissionAPI.as_view(), name="get_submission_api"),

    path("contestSubmission/", ContestSubmissionAPI.as_view(), name="contestSubmission"),
    path("problemSubmission/", ProblemSubmissionAPI.as_view(), name="problemSubmission"),
    path("userSubmission/", UserSubmissionAPI.as_view(), name="userSubmission")
]