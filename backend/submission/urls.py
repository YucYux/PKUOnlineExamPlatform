from  django.conf.urls import url

from .views import SubmitAPI, GetSubmissionAPI, ContestSubmissionAPI, ProblemSubmissionAPI, UserSubmissionAPI

urlpatterns = [
    url(r"submission/?", SubmitAPI.as_view(), name="submission_api"),
    url(r"getSubmission/?", GetSubmissionAPI.as_view(), name="getSubmission"),
    url(r"contestSubmission/?", ContestSubmissionAPI.as_view(), name="contestSubmission"),
    url(r"problemSubmission/?", ProblemSubmissionAPI.as_view(), name="problemSubmission"),
    url(r"userSubmission/?", UserSubmissionAPI.as_view(), name="userSubmission")
]