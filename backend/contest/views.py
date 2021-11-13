from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib import auth
import dateutil.parser


class ContestAPI(APIView):
    def post(self, request):
        data = request.data 
        data["start_time"] = dateutil.parser.parse(data["start_time"])
        data["end_time"] = dateutil.parser.parse(data["end_time"])
        data["created_by"] = request.user
        if data["end_time"] <= data["start_time"]:
            return self.error("Start time must occur earlier than end time")
            
