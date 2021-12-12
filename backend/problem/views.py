import os
import json
import zipfile
import hashlib
from wsgiref.util import FileWrapper

from django.conf import settings
from django.http import StreamingHttpResponse
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Problem, ProblemTag
from .serializers import TestCaseUploadForm, GetContestIDSerializer, \
    GetProblemIDSerializer, ProblemListSerializer, GetProblemTagSerializer, \
    GetProblemTitleSerializer
from contest.models import Contest, ContestStatus
from utils.shortcuts import rand_str, natural_sort_key


class ZipError(Exception):
    def __init__(self, msg, err=None):
        self.err = err
        self.msg = msg
        super().__init__(err, msg)


class TestCaseZipProcessor(object):
    def process_zip(self, uploaded_zip_file, dir=""):
        try:
            zip_file = zipfile.ZipFile(uploaded_zip_file, "r")
        except zipfile.BadZipFile:
            raise ZipError("Bad zip file")
        name_list = zip_file.namelist()
        test_case_list = self.filter_name_list(name_list, dir=dir)
        if not test_case_list:
            raise ZipError("Empty file")

        test_case_id = rand_str()
        test_case_dir = os.path.join(settings.TEST_CASE_DIR, test_case_id)
        os.mkdir(test_case_dir)
        os.chmod(test_case_dir, 0o710)

        size_cache = {}
        md5_cache = {}

        for item in test_case_list:
            with open(os.path.join(test_case_dir, item), "wb") as f:
                content = zip_file.read(f"{dir}{item}").replace(b"\r\n", b"\n")
                size_cache[item] = len(content)
                if item.endswith(".out"):
                    md5_cache[item] = hashlib.md5(content.rstrip()).hexdigest()
                f.write(content)
        test_case_info = {"test_cases": {}}

        info = []

        # ["1.in", "1.out", "2.in", "2.out"] => [("1.in", "1.out"), ("2.in", "2.out")]
        test_case_list = zip(*[test_case_list[i::2] for i in range(2)])
        for index, item in enumerate(test_case_list):
            data = {"stripped_output_md5": md5_cache[item[1]],
                    "input_size": size_cache[item[0]],
                    "output_size": size_cache[item[1]],
                    "input_name": item[0],
                    "output_name": item[1]}
            info.append(data)
            test_case_info["test_cases"][str(index + 1)] = data

        with open(os.path.join(test_case_dir, "info"), "w", encoding="utf-8") as f:
            f.write(json.dumps(test_case_info, indent=4))

        for item in os.listdir(test_case_dir):
            os.chmod(os.path.join(test_case_dir, item), 0o640)

        return info, test_case_id

    def filter_name_list(self, name_list, dir=""):
        ret = []
        prefix = 1
        while True:
            in_name = f"{prefix}.in"
            out_name = f"{prefix}.out"
            if f"{dir}{in_name}" in name_list and f"{dir}{out_name}" in name_list:
                ret.append(in_name)
                ret.append(out_name)
                prefix += 1
                continue
            else:
                return sorted(ret, key=natural_sort_key)


class TestCaseAPI(APIView, TestCaseZipProcessor):
    request_parsers = ()

    def get(self, request):
        problem_id = request.GET.get("problem_id")
        if not problem_id:
            return Response("Parameter error, problem_id is required",
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            problem = Problem.objects.get(id=problem_id)
        except Problem.DoesNotExist:
            return Response("Problem does not exists",
                            status=status.HTTP_400_BAD_REQUEST)

        test_case_dir = os.path.join(settings.TEST_CASE_DIR, problem.test_case_id)
        if not os.path.isdir(test_case_dir):
            return Response("Test case does not exists",
                            status=status.HTTP_400_BAD_REQUEST)
        name_list = self.filter_name_list(os.listdir(test_case_dir))
        name_list.append("info")
        file_name = os.path.join(test_case_dir, problem.test_case_id + ".zip")
        with zipfile.ZipFile(file_name, "w") as file:
            for test_case in name_list:
                file.write(f"{test_case_dir}/{test_case}", test_case)
        response = StreamingHttpResponse(FileWrapper(open(file_name, "rb")),
                                         content_type="application/octet-stream")

        response["Content-Disposition"] = f"attachment; filename=problem_{problem.id}_test_cases.zip"
        response["Content-Length"] = os.path.getsize(file_name)
        return response

    def post(self, request):
        form = TestCaseUploadForm(request.FILES)
        if form.is_valid():
            file = form.cleaned_data["file"]
        else:
            return Response("Upload failed", status=status.HTTP_400_BAD_REQUEST)
        zip_file = f"/tmp/{rand_str()}.zip"
        with open(zip_file, "wb") as f:
            for chunk in file:
                f.write(chunk)
        info, test_case_id = self.process_zip(zip_file)
        os.remove(zip_file)
        return Response({"id": test_case_id, "info": info}, status=status.HTTP_201_CREATED)


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
            probelm_json = problem.values()
            return Response(probelm_json, status=status.HTTP_200_OK)
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
            return Response(problem_list, status=status.HTTP_200_OK)
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

