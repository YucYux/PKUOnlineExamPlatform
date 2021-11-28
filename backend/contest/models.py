from django.db import models
from django.db.models import JSONField
from django.utils.timezone import now

from ..account.models import User, Class


class ContestStatus:
    TO_BE_STARTED = "1"
    ENDED = "-1"
    UNDERWAY = "0"


class Contest(models.Model):
    title = models.TextField()
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    create_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    class_info = models.ForeignKey(Class, on_delete=models.CASCADE)
    visible = models.BooleanField(default=True)

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


class ContestRank(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE)
    submission_number = models.IntegerField(default=0)
    accepted_number = models.IntegerField(default=0)
    submission_info = JSONField(default=dict)

    class Meta:
        db_table = "Contest_Rank"
        unique_together = (("user", "contest"),)
        verbose_name = verbose_name_plural = u"考试排名信息"