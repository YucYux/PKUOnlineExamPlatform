from django.db import models

from account.models import User


class Announcement(models.Model):
    """
    公告类
    """
    title = models.CharField(max_length=100, verbose_name=u'公告标题')
    content = models.TextField(verbose_name=u'公告内容')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name=u'公告创建时间')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=u'公告作者')
    last_update_time = models.DateTimeField(auto_now=True, verbose_name=u'公告上次更新时间')
    visible = models.BooleanField(default=True, verbose_name=u'公告是否可见')

    class Meta:
        db_table = "Announcement"
        ordering = ("-create_time",)
        verbose_name = verbose_name_plural = u'公告信息'

    def __str__(self):
        return self.title