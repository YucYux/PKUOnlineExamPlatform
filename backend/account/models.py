from django.contrib.auth.models import AbstractUser
from django.db import models


class AdminType(object):
    STUDENT = "Student"
    TEACHING_ASSISTANT = "Teaching_Assistant"
    TEACHER = "Teacher"


class User(AbstractUser):
    student_name = models.CharField(max_length=30, blank=True, verbose_name=u"姓名")
    student_number = models.CharField(max_length=11, blank=True, verbose_name=u"学号")
    class_info = models.IntegerField(null=True, blank=True, verbose_name=u"班级")
    admin_choices = (
        (AdminType.STUDENT, u"学生"),
        (AdminType.TEACHING_ASSISTANT, u"助教"),
        (AdminType.TEACHER, u"老师"),
    )
    admin_type = models.CharField(max_length=20, choices=admin_choices,
                                  default=AdminType.STUDENT, verbose_name=u"用户类型")

    class Meta:
        db_table = "User"
        verbose_name = verbose_name_plural = u"用户信息"


class Class(models.Model):
    teacher = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name=u"授课教师")
    class_number = models.IntegerField(verbose_name=u"班号")
    class_name = models.CharField(max_length=100, verbose_name=u"班级名称")

    class Meta:
        db_table = "Class"
        verbose_name = verbose_name_plural = u"班级信息"

    def __str__(self):
        return self.class_name
