from django.shortcuts import render

# Create your views here.
from models import Submission
from rest_framework.views import APIView
from problem.models import Problem
from contest.models import Contest,ContestStatus
from account.models import User
from .serializers import SubmissionSerializer
from judge.tasks import judge_task

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
                s_contest = Contest.objects.get(title=data['contest_title'])
            except Contest.DoesNotExist:
                return self.response({"error": "sub error", "data": "Contest not exist"})
            permission = check_contest(s_contest)
            # 检查一下考试是否正在进行
            if not permission:
                return self.response({"error": "sub error", "data": "contest is ended or not start yet"})

            if data.get('problem_id'):
                try:
                    s_problem = Problem.objects.get(id=data['problem_id'], contest_title=data['contest_title'], visible=True)
                except Problem.DoesNotExist:
                    return self.response({"error": "sub error", "data": "Problem not exist"})
                # 是否需要给user一个唯一的id便于查找
                if data.get('user_id'):
                    try:
                        s_user = User.objects.get(id=data['user_id'])
                    except User.DoesNotExist:
                        return self.response({"error": "sub error", "data": "User not exist"})
                    submission = Submission.objects.create(contest=s_contest,
                                                           problem=s_problem,
                                                           user=s_user,
                                                           code=data['code']
                                                           )
                    # TODO judge还没有加上
                    judge_task.send(submission.sub_id, s_problem.id)
                    return self.response({"error": None, "data": {"submission_id": submission.id}})

        else:
            return self.response({"error": "sub error", "data": "contest_title or problem_id not included"})

    def get(self, request):
        sub_id = request.GET.get('id')
        if not sub_id:
            return self.response({"error": "sub error", "data": "GET sub id not exist"})
        try:
            submission = Submission.objects.select_related("problem").get(id=sub_id)
        except Submission.DoesNotExist:
            return self.response({"error": "sub error", "data": "GET sub not exist"})

        submission_data = SubmissionSerializer(submission).data
        return self.response({"error": None, "data": submission_data})
