from django.db import models
from django.db.models import JSONField
from django.utils.timezone import now

from account.models import User, Class


class ContestStatus:
    TO_BE_STARTED = "1"
    ENDED = "-1"
    UNDERWAY = "0"


class Contest(models.Model):
    title = models.CharField(max_length=100, verbose_name=u'考试名称')
    description = models.TextField(verbose_name=u'考试信息')
    start_time = models.DateTimeField(verbose_name=u'考试开始时间')
    end_time = models.DateTimeField(verbose_name=u'考试结束时间')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name=u'考试创建时间')
    last_update_time = models.DateTimeField(auto_now=True, verbose_name=u'考试上次更新时间')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=u'考试创建者')
    class_info = models.ForeignKey(Class, on_delete=models.CASCADE, verbose_name=u'考试所属班级')
    visible = models.BooleanField(default=True, verbose_name=u'考试是否可用')

    @property
    def status(self):
        if self.start_time > now():
            return ContestStatus.TO_BE_STARTED
        elif self.end_time < now():
            return ContestStatus.ENDED
        else:
            return ContestStatus.UNDERWAY

    class Meta:
        db_table = "Contest"
        verbose_name = verbose_name_plural = u"考试信息"
        ordering = ("-start_time",)

    def __str__(self):
        return self.title


class ContestRank(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE)
    submission_number = models.IntegerField(default=0)
    accepted_number = models.IntegerField(default=0)

    class Meta:
        db_table = "Contest_Rank"
        unique_together = (("user", "contest"),)
        verbose_name = verbose_name_plural = u"考试成绩信息"