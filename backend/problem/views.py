from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Problem, ProblemTag
from .serializers import GetContestIDSerializer, \
    GetProblemIDSerializer, ProblemListSerializer, GetProblemTagSerializer, \
    GetProblemTitleSerializer, AddProblemToContestSerializer
from contest.models import Contest, ContestStatus
from account.views import getUserFromRequest


"""
创建题目因为涉及输入输出文件的传输和存储，前端上比较难做还没有做好
所以目前是将题目注册到了admin以纯后端来进行题目的添加，暂时没有创建和修改题目的接口
另外因为使用的是QDU开源的Judger Server，其对题目的存储格式有特殊要求，纯后端没有处理的方法
目前暂时将其需要对输入输出文件进行的格式处理写成了一个脚本放在了/problem_data里，具体的使用方法见其中的README
后续如果使用其他的Judger或者自己写好了判题沙箱的话可以定义好题目输入输出文件的使用规则，从而好写创建和修改题目的接口

还有一个问题是添加题目到考试前端也比较难没有做好
但后端这边从题目的搜索到添加接口都已经做好了，只需要前端做好之后测以下交互即可
"""

class GetProblemFromContestAPI(APIView):
    """
    获取某场考试的所有题目列表
    """
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
    """
    获取某个题目的具体信息
    """
    def post(self, request):
        serializer = GetProblemIDSerializer(data=request.data)
        if serializer.is_valid():
            problem = Problem.objects.filter(_id=serializer.data["id"])
            problem_json = problem.values()
            return Response(problem_json[0], status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetProblemListAPI(generics.ListAPIView):
    """
    获取所有题目
    """
    queryset = Problem.objects.all()
    serializer_class = ProblemListSerializer


class SearchProblemByIDAPI(APIView):
    """
    按照题目ID搜索题目
    """
    def post(self, request):
        serializer = GetProblemIDSerializer(data=request.data)
        if serializer.is_valid():
            problems = Problem.objects.filter(_id=serializer.data["id"])
            problems_json = problems.values("_id", "title")
            return Response(problems_json, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class SearchProblemByTagAPI(APIView):
    """
    按照题目Tag搜索题目
    """
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
    """
    按照题目名称搜索题目
    """
    def post(self, request):
        serializer = GetProblemTitleSerializer(data=request.data)
        if serializer.is_valid():
            problems = Problem.objects.filter(title__icontains=serializer.data["name"])
            problems_json = problems.values("_id", "title")
            return Response(problems_json, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class AddProblemToContestAPI(APIView):
    """
    添加某个题目到某场考试
    """
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
