from django.urls import path

from .views import SubmitAPI, GetSubmissionAPI, ContestSubmissionAPI, ProblemSubmissionAPI, UserSubmissionAPI

urlpatterns = [
    path(r"submission/?", SubmitAPI.as_view(), name="submission_api"),
    path(r"getSubmission/?", GetSubmissionAPI.as_view(), name="getSubmission"),
    path(r"contestSubmission/?", ContestSubmissionAPI.as_view(), name="contestSubmission"),
    path(r"problemSubmission/?", ProblemSubmissionAPI.as_view(), name="problemSubmission"),
    path(r"userSubmission/?", UserSubmissionAPI.as_view(), name="userSubmission")
]