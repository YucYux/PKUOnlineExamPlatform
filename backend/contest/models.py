from django.db import models
from utils.models import RichTextField
from django.utils.timezone import now
from ..account.models import User
from utils.models import JSONField
from utils.constants import ContestStatus, ContestType, ContestRuleType
# Create your models here.


class Contest(models.Model):
    title = models.TextField()
    description = RichTextField()
    # show real time rank or cached rank
    real_time_rank = models.BooleanField()
    password = models.TextField(null=True)
    # enum of ContestRuleType
    rule_type = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    create_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    # 是否可见 false的话相当于删除
    visible = models.BooleanField(default=True)
    # allowed_ip_ranges = JSONField(default=list)

    @property
    def status(self):
        if self.start_time > now():
            # 没有开始 返回1
            return ContestStatus.CONTEST_NOT_START
        elif self.end_time < now():
            # 已经结束 返回-1
            return ContestStatus.CONTEST_ENDED
        else:
            # 正在进行 返回0
            return ContestStatus.CONTEST_UNDERWAY

    @property
    def contest_type(self):
        if self.password:
            return ContestType.PASSWORD_PROTECTED_CONTEST
        return ContestType.PUBLIC_CONTEST

    # 是否有权查看problem 的一些统计信息 诸如submission_number, accepted_number 等
    def problem_details_permission(self, user):
        return self.rule_type == ContestRuleType.ACM or \
               self.status == ContestStatus.CONTEST_ENDED or \
               user.is_authenticated and user.is_contest_admin(self) or \
               self.real_time_rank

    class Meta:
        db_table = "contest"
        ordering = ("-start_time",)



