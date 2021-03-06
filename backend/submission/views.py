import hashlib
import requests
import json

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from problem.models import Problem
from contest.models import Contest, ContestRank
from account.models import User
from account.views import getUserFromRequest
from .serializers import SubmitSerializer, GetSubmissionSerializer
from .models import Submission, JudgeStatus

"""
一点说明：
提交相关的接口与模型的设计高度依赖于最后的判题服务器的选择
目前的设计全部是基于QDU Judge Server来做的
后续更换了其他判题服务器或者是写好了自己的判题服务器的话，需要对整个提交app进行相应的改动
"""


# 在QDU Judge Server上运行Python程序的一些设置
default_env = ["LANG=en_US.UTF-8", "LANGUAGE=en_US:en", "LC_ALL=en_US.UTF-8"]

py3_lang_config = {
    "compile": {
        "src_name": "solution.py",
        "exe_name": "__pycache__/solution.cpython-36.pyc",
        "max_cpu_time": 3000,
        "max_real_time": 5000,
        "max_memory": 128 * 1024 * 1024,
        "compile_command": "/usr/bin/python3 -m py_compile {src_path}",
    },
    "run": {
        "command": "/usr/bin/python3 {exe_path}",
        "seccomp_rule": "general",
        "env": ["PYTHONIOENCODING=UTF-8"] + default_env
    }
}


# 给QDU Judge Server发消息的相关函数
class JudgeServerClientError(Exception):
    pass


class JudgeServerClient(object):
    def __init__(self, token, server_base_url):
        self.token = hashlib.sha256(token.encode("utf-8")).hexdigest()
        self.server_base_url = server_base_url.rstrip("/")

    def _request(self, url, data=None):
        kwargs = {"headers": {"X-Judge-Server-Token": self.token,
                              "Content-Type": "application/json"}}
        if data:
            kwargs["data"] = json.dumps(data)
        try:
            return requests.post(url, **kwargs).json()
        except Exception as e:
            raise JudgeServerClientError(str(e))

    def ping(self):
        return self._request(self.server_base_url + "/ping")

    def judge(self, src, language_config, max_cpu_time, max_memory, test_case_id=None, test_case=None, spj_version=None,
              spj_config=None,
              spj_compile_config=None, spj_src=None, output=False):
        if not (test_case or test_case_id) or (test_case and test_case_id):
            raise ValueError("invalid parameter")

        data = {"language_config": language_config,
                "src": src,
                "max_cpu_time": max_cpu_time,
                "max_memory": max_memory,
                "test_case_id": test_case_id,
                "test_case": test_case,
                "spj_version": spj_version,
                "spj_config": spj_config,
                "spj_compile_config": spj_compile_config,
                "spj_src": spj_src,
                "output": output}
        return self._request(self.server_base_url + "/judge", data=data)


class SubmitAPI(APIView):
    """
    提交的API
    token和client的设置需要根据具体在docker-compose里是怎么设置的来进行相应的设置
    """
    def post(self, request):
        serializer = SubmitSerializer(data=request.data)
        if serializer.is_valid():
            token = "JUDGER"
            client = JudgeServerClient(token=token, server_base_url="http://0.0.0.0:27017")
            data = serializer.data
            contest = Contest.objects.get(id=data["contest_id"])
            problem = Problem.objects.get(_id=data["problem_id"])
            user = getUserFromRequest(request)
            code = data["code"]
            info = client.judge(src=code, language_config=py3_lang_config,
                                max_cpu_time=1000, max_memory=128 * 1024 * 1024,
                                test_case_id=problem._id, output=True)
            result = JudgeStatus.ACCEPTED
            if info["err"] == "CompileError":
                result = JudgeStatus.COMPILE_ERROR
            else:
                for test_case in info["data"]:
                    if test_case["result"] != 0:
                        result = test_case["result"]
                        break
            already_ac = False
            last_submissions = Submission.objects.filter(contest=contest,
                                                         problem=problem,
                                                         user=user)
            for last_submission in last_submissions.values("result"):
                if last_submission["result"] == JudgeStatus.ACCEPTED:
                    already_ac = True
                    break
            submission_obj = Submission.objects.create(contest=contest,
                                                       problem=problem,
                                                       user=user,
                                                       code=code,
                                                       result=result,
                                                       info=info)
            rank, _ = ContestRank.objects.get_or_create(contest=contest,
                                                        user=user)
            if result == JudgeStatus.ACCEPTED and not already_ac:
                rank.accepted_number = rank.accepted_number + 1
            rank.submission_number = rank.submission_number + 1
            rank.save()

            return Response({"status": result,
                             "info": info},
                            status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetSubmissionAPI(APIView):
    """
    返回用户在哪场考试哪个题目里的所有提交记录
    """
    def post(self, request):
        serializer = GetSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
            contest = Contest.objects.get(id=data["contest_id"])
            problem = Problem.objects.get(_id=data["problem_id"])
            user = getUserFromRequest(request)
            submissions = Submission.objects.filter(contest=contest,
                                                    problem=problem,
                                                    user=user)
            return Response(submissions.values("result", "sub_time"), status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)