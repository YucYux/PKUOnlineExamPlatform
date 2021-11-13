from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from ..contest import views


router = DefaultRouter()
router.register(r'contest', views.ContestViewSet)

urlpatterns = [
    url(r'contest', include(router.urls))
]