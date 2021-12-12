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
    sub_id = models.TextField(default=get_rand_id, primary_key=True, db_index=True, verbose_name=u'提交ID')
    contest = models.ForeignKey(Contest, null=True, on_delete=models.CASCADE, verbose_name=u'对应考试')
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, verbose_name=u'对应问题')
    sub_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
