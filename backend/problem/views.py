from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Problem, ProblemTag
from .serializers import GetContestIDSerializer, \
    GetProblemIDSerializer, ProblemListSerializer, GetProblemTagSerializer, \
    GetProblemTitleSerializer, AddProblemToContestSerializer
from contest.models import Contest, ContestStatus
from utils.shortcuts import rand_str, natural_sort_key
from account.views import getUserFromRequest


class GetProblemFromContestAPI(APIView):
    def post(self, request):
        serializer = GetContestIDSerializer(data=request.data)
        if serializer.is_valid():
            contest = Contest.objects.get(id=serializer.data["id"])
            if contest.status == ContestStatus.TO_BE_STARTED:
                return Response({}, status=status.HTTP_400_BAD_REQUEST)
            problem_list = Problem.objects.filter(contest__id=serializer.data["id"])
            problem_list_json = problem_list.values("_id", "title")
            return Response(problem_list_json, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetProblemDetailAPI(APIView):
    def post(self, request):
        serializer = GetProblemIDSerializer(data=request.data)
        if serializer.is_valid():
            problem = Problem.objects.filter(_id=serializer.data["id"])
            problem_json = problem.values()
            return Response(problem_json[0], status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetProblemListAPI(generics.ListAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemListSerializer


class SearchProblemByIDAPI(APIView):
    def post(self, request):
        serializer = GetProblemIDSerializer(data=request.data)
        if serializer.is_valid():
            problems = Problem.objects.filter(_id=serializer.data["id"])
            problems_json = problems.values("_id", "title")
            return Response(problems_json, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class SearchProblemByTagAPI(APIView):
    def post(self, request):
        serializer = GetProblemTagSerializer(data=request.data)
        if serializer.is_valid():
            tags = ProblemTag.objects.filter(name__contains=serializer.data["tag"])
            problem_list = []
            for tag_name in tags:
                tag = ProblemTag.objects.get(name=tag_name)
                problems = Problem.objects.filter(tags=tag.id)
                for problem in problems:
                    problem_list.append({
                        "_id": problem._id,
                        "title": problem.title
                    })
            ret_problems = []
            for problem in problem_list:
                if problem not in ret_problems:
                    ret_problems.append(problem)
            return Response(ret_problems, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class SearchProblemByNameAPI(APIView):
    def post(self, request):
        serializer = GetProblemTitleSerializer(data=request.data)
        if serializer.is_valid():
            problems = Problem.objects.filter(title__icontains=serializer.data["name"])
            problems_json = problems.values("_id", "title")
            return Response(problems_json, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class AddProblemToContestAPI(APIView):
    def post(self, request):
        serializer = AddProblemToContestSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
            contest = Contest.objects.get(id=data["contest_id"])
            problem_list = data["problem_ids"]
            for problem_id in problem_list:
                problem_obj = Problem.objects.get(_id=problem_id)
                problem_obj.contest.add(contest)
            return Response(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
