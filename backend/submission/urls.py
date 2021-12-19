from django.urls import path

from .views import SubmitAPI, GetSubmissionAPI, ContestSubmissionAPI, ProblemSubmissionAPI, UserSubmissionAPI

urlpatterns = [
    path("submission/?", SubmitAPI.as_view(), name="submission_api"),
    path("getSubmission/?", GetSubmissionAPI.as_view(), name="getSubmission"),
    path("contestSubmission/?", ContestSubmissionAPI.as_view(), name="contestSubmission"),
    path("problemSubmission/?", ProblemSubmissionAPI.as_view(), name="problemSubmission"),
    path("userSubmission/?", UserSubmissionAPI.as_view(), name="userSubmission")
]