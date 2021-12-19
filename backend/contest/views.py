import dateutil.parser

from django.utils.timezone import now
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Contest, ContestRank
from .serializers import CreateContestSerializer, GetContestRankSerializer
from account.models import Class, AdminType, User
from account.views import getUserFromRequest
from submission.models import Submission
from problem.models import Problem


class GetContestListAPI(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = getUserFromRequest(request)
        contests = Contest.objects.filter(class_info=user.class_info,
                                          end_time__gt=now())
        return Response(contests.values(), status=status.HTTP_200_OK)


class CreateContestAPI(APIView):
    permission_classes = (IsAdminUser,)

    def post(self, request):
        serializer = CreateContestSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
            user = getUserFromRequest(request)
            data["start_time"] = dateutil.parser.parse(data["start_time"])
            data["end_time"] = dateutil.parser.parse(data["end_time"])
            data["visible"] = True
            if data["end_time"] <= data["start_time"]:
                return Response({"msg": u"考试结束时间在开始时间之前！"},
                                status=status.HTTP_400_BAD_REQUEST)
            contest_obj = Contest.objects.create(title=data["title"],
                                                 description=data["description"],
                                                 start_time=data["start_time"],
                                                 end_time=data["end_time"],
                                                 created_by=user,
                                                 visible=True,
                                                 class_info=Class.objects.get(class_number=data["class_info"]))
            data["id"] = contest_obj.id
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetEndedContestListAPI(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = getUserFromRequest(request)
        contests = Contest.objects.filter(class_info=user.class_info,
                                          end_time__lt=now())
        return Response(contests.values(), status=status.HTTP_200_OK)


class GetContestRankAPI(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = getUserFromRequest(request)
        serializer = GetContestRankSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
            contest = Contest.objects.get(id=data["contest_id"])
            problem_cnt = Problem.objects.filter(contest=contest).count()
            if user.admin_type == AdminType.STUDENT:
                rank = ContestRank.objects.get(contest=contest,
                                               user=user)
                rank_info = {"problem_cnt": problem_cnt,
                             "submission_number": rank.submission_number,
                             "accepted_number": rank.accepted_number}
                return Response(rank_info, status=status.HTTP_200_OK)
            else:
                rank_list = [{"problem_cnt": problem_cnt}]
                student_list = User.objects.filter(class_info=user.class_info,
                                                   admin_type=AdminType.STUDENT)
                for student in student_list:
                    rank, _ = ContestRank.objects.get_or_create(contest=contest,
                                                                user=student)
                    rank_info = {"student_name": student.student_name,
                                 "student_number": student.student_number,
                                 "submission_number": rank.submission_number,
                                 "accepted_number": rank.accepted_number}
                    rank_list.append(rank_info)
                return Response(rank_list, status=status.HTTP_200_OK)
        else:
            Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
