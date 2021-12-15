from django.db import models

# Create your models here.
from account.models import User
from problem.models import Problem
from contest.models import Contest
import secrets


class JudgeStatus:
    COMPILE_ERROR = -2
    WRONG_ANSWER = -1
    ACCEPTED = 0
    CPU_TIME_LIMIT_EXCEEDED = 1
    REAL_TIME_LIMIT_EXCEEDED = 2
    MEMORY_LIMIT_EXCEEDED = 3
    RUNTIME_ERROR = 4
    SYSTEM_ERROR = 5
    PENDING = 6
    JUDGING = 7
    PARTIALLY_ACCEPTED = 8


def get_rand_id(len=32, allow_chars="abcdefghijklmnopqrstuvwxyz0123456789"):
    return ''.join(secrets.choice(allow_chars) for i in range(len))


class Submission(models.Model):
    contest = models.ForeignKey(Contest, null=True, on_delete=models.CASCADE, verbose_name=u'对应考试')
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, verbose_name=u'对应问题')
    # user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=u'提交用户')
    user_id = models.IntegerField(db_index=True)
    user_name = models.TextField()
    code = models.TextField(verbose_name=u'代码')
    sub_id = models.TextField(default=get_rand_id, primary_key=True, db_index=True, verbose_name=u'提交ID')
    sub_time = models.DateTimeField(auto_now_add=True, verbose_name=u'提交时间')
    result = models.IntegerField(db_index=True, default=JudgeStatus.PENDING, verbose_name=u'提交结果')

    info = models.JSONField(null=True, verbose_name=u'judge server返回信息')

    # if_shared = models.BooleanField(default=False) 之后可以加上代码共享功能
    # 代码语言默认为python
    # def check_permission(self, user,):

    class Meta:
        db_table = "submission"
        ordering = ("-create_time",)

    def __str__(self):
        return self.sub_id
