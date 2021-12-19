from django.urls import path

from .views import SubmitAPI, GetSubmissionAPI

urlpatterns = [
    path('submit/', SubmitAPI.as_view(), name="submit_api"),
    path('getsubmission/', GetSubmissionAPI.as_view(), name="get_submission_api"),
]