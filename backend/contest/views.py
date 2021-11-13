from django.shortcuts import render

# Create your views here.
import copy
import os
import zipfile

from ..account.models import User
from ..contest.models import Contest
from ..contest.serializers import ContestAdminSerializer

from rest_framework import viewsets

class MusicViewSet(viewsets.ModelViewSet):
    queryset = Contest.object.all()
    serializer_class = ContestAdminSerializer