from django.contrib.auth.models import AbstractUser
from django.db import models


class AdminType(object):
    STUDENT = "Student"
    TEACHING_ASSISTANT = "Teaching Assistant"
    TEACHER = "Teacher"


class User(AbstractUser):
    student_name = models.CharField(max_length=30, verbose_name=u"姓名")
    student_number = models.CharField(max_length=11, verbose_name=u"学号", unique=True)
    admin_type = models.TextField(default=AdminType.STUDENT)
    class_number = models.TextField

    class Meta:
        db_table = "User"
        verbose_name = verbose_name_plural = u"用户信息"