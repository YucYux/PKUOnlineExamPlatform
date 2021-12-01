from account.models import AdminType
from utils.constants import CacheKey, CONTEST_PASSWORD_SESSION_KEY
from utils.shortcuts import datetime2str, check_is_id
from utils.decorator import login_required
import dateutil.parser
from utils.api import validate_serializer

from django.core.cache import cache
# from rest_framework.views import APIView
from utils.api import APIView
from django.utils.timezone import now
from .models import Contest
from .serializers import ContestSerializer
from .models import ContestStatus,ContestRank
from .serializers import ContestRankSerializer,ContestAdminSerializer,CreateConetestSeriaizer,EditConetestSeriaizer
from django.http import JsonResponse
class ContestAPI(APIView):
    def get(self, request):
        id = request.GET.get("id")
        if not id or not check_is_id(id):
            return self.error("Invalid parameter, id is required")
        try:
            contest = Contest.objects.get(id=id, visible=True)
        except Contest.DoesNotExist:
            return self.error("Contest does not exist")
        data = ContestSerializer(contest).data
        data["now"] = datetime2str(now())
        return self.success(data)


class ContestListAPI(APIView):
    def get(self, request):
        #token = request.Get.get("token")
        #user_type = tokenprocess(token)

        contests = Contest.objects.select_related("created_by").filter(visible=True)
        keyword = request.GET.get("keyword")
        #print(keyword)
        #print(request)
        rule_type = request.GET.getlist("rule_type")
        #print(rule_type)
        status = request.GET.get("status")
        if keyword:
            contests = contests.filter(title__contains=keyword)
        if rule_type:
            contests = contests.filter(rule_type=rule_type[0])
        if status:
            cur = now()
            if status == ContestStatus.CONTEST_NOT_START:
                contests = contests.filter(start_time__gt=cur)
            elif status == ContestStatus.CONTEST_ENDED:
                contests = contests.filter(end_time__lt=cur)
            else:
                contests = contests.filter(start_time__lte=cur, end_time__gte=cur)
        return self.success(self.paginate_data(request, contests, ContestSerializer))


class ContestAccessAPI(APIView):
    @login_required
    def get(self, request):
        contest_id = request.GET.get("contest_id")
        if not contest_id:
            return self.error()
        try:
            contest = Contest.objects.get(id=contest_id, visible=True, password__isnull=False)
        except Contest.DoesNotExist:
            return self.error("Contest does not exist")

        return self.success({"access": True})

class ContestRankAPI(APIView):
    def get_rank(self):
        return ContestRank.objects.filter(contest=self.contest,
                                          user__admin_type=AdminType.STUDENT,
                                          user__is_disabled=False).\
                select_related("user").order_by("-accepted_number", "total_time")

    def column_string(self, n):
        string = ""
        while n > 0:
            n, remainder = divmod(n - 1, 26)
            string = chr(65 + remainder) + string
        return string

    def get(self,request):
        download_csv = request.GET.get("download_csv")
        force_refresh = request.GET.get("force_refresh")
        is_contest_admin = request.user.is_authenticated and request.user.is_assist(self.contest)
        serializer = ContestRankSerializer
        if force_refresh == "1" and is_contest_admin:
            qs = self.get_rank()
        else:
            cache_key = f"{CacheKey.contest_rank_cache}:{self.contest.id}"
            qs = cache.get(cache_key)
            if not qs:
                qs = self.get_rank()
                cache.set(cache_key, qs)

        # 下载排名表的操作，待写
        if download_csv:
            pass

        page_qs = self.paginate_data(request, qs)
        page_qs["results"] = serializer(page_qs["results"], many=True, is_contest_admin=is_contest_admin).data
        return self.success(page_qs)

class ContestAdminAPI(APIView):
    def post(self, request):
        serializer=CreateConetestSeriaizer(data=request.data)
        if serializer.is_valid():
            data = request.data
            data["start_time"] = dateutil.parser.parse(data["start_time"])
            data["end_time"] = dateutil.parser.parse(data["end_time"])
            data["created_by"] = request.user
            if data["end_time"] <= data["start_time"]:
                return self.error("Start time must occur earlier than end time")
            contest = Contest.objects.create(**data)
            return self.success(ContestAdminSerializer(contest).data)
        else:
            return self.invalid_serializer(serializer)


    def put(self, request):
        data = request.data
        serializer = EditConetestSeriaizer(data=request.data)
        if serializer.is_valid():
            try:
                contest = Contest.objects.get(id=data.pop("id"))
                ensure_created_by(contest, request.user)
            except Contest.DoesNotExist:
                return self.error("Contest does not exist")
            data["start_time"] = dateutil.parser.parse(data["start_time"])
            data["end_time"] = dateutil.parser.parse(data["end_time"])
            if data["end_time"] <= data["start_time"]:
                return self.error("Start time must occur earlier than end time")
            for k, v in data.items():
                setattr(contest, k, v)
            contest.save()
            return self.success(ContestAdminSerializer(contest).data)
        else:
            return self.invalid_serializer(serializer)

    def get(self, request):
        contest_id = request.GET.get("id")
        if contest_id:
            try:
                contest = Contest.objects.get(id=contest_id)
                ensure_created_by(contest, request.user)
                return self.success(ContestAdminSerializer(contest).data)
            except Contest.DoesNotExist:
                return self.error("Contest does not exist")

        contests = Contest.objects.all().order_by("-create_time")

        keyword = request.GET.get("keyword")
        if keyword:
            contests = contests.filter(title__contains=keyword)
        return self.success(self.paginate_data(request, contests, ContestAdminSerializer))

class DownloadContestSubmissions(APIView):
    # 下载比赛提交情况，待写
    def _dump_submissions(self):
        pass

    def get(self,request):
        contest_id = request.GET.get("contest_id")
        if not contest_id:
            return self.error("Parameter error")
        try:
            contest = Contest.objects.get(id=contest_id)
            ensure_created_by(contest, request.user)
        except Contest.DoesNotExist:
            return self.error("Contest does not exist")

        exclude_admin = request.GET.get("exclude_admin") == "1"
        zip_path = self._dump_submissions(contest, exclude_admin)

def ensure_created_by(obj,user):
    e = APIError(msg=f"{obj.__class__.__name__} does not exist")
    if not user.is_assist():
        raise e
    return

class APIError(Exception):
    def __init__(self, msg, err=None):
        self.err = err
        self.msg = msg
        super().__init__(err, msg)