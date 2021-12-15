from django.urls import path, re_path

from .views import SubmitAPI

urlpatterns = [
    path('submit/', SubmitAPI.as_view(), name="submit_api"),
]