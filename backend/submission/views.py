from django.shortcuts import render

# Create your views here.
from models import Submission
from rest_framework.views import APIView
from problem.models import Problem
from  contest.models import Contest,ContestStatus


def check_contest(contest):
    if contest.status * () == ContestStatus.UNDERWAY:
        return True
    else:
        return False


class SubmissionAPI(APIView):

    def post(self, request):
        data = request.data
        if data.get('contest_title'):
            try:
                contest = Contest.objects.get(title=data['contest_title'])
            except Contest.DoesNotExist:
                return self.response({"error": "sub error", "data": "Contest not exist"})
            permission = check_contest(contest)
            #检查一下考试是否正在进行
            if not permission:
                return self.response({"error": "contest time error", "data": "contest is ended or not start yet"})

