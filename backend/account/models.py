from django.contrib.auth.models import AbstractUser
from django.db import models


class AdminType(object):
    """
    需求所要求的权限类型
    其中"超级管理员"按照Django superuser即可，不需要在该字段中加入
    """
    STUDENT = "Student"
    TEACHING_ASSISTANT = "Teaching_Assistant"
    TEACHER = "Teacher"


class User(AbstractUser):
    """
    在User的实现上继承了AbstractUser，获得了扩展字段的能力
    功能上来说已经够用，后续要继续扩展的可以直接扩展字段，如果要大改的话可以考虑继承AbstractBaseUser
    """
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

    def is_assist(self):
        return self.admin_type == AdminType.TEACHER and self.admin_type == AdminType.TEACHING_ASSISTANT
    def is_teacher(self):
        return self.admin_type == AdminType.TEACHER


class Class(models.Model):
    teacher = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name=u"授课教师")
    class_number = models.IntegerField(verbose_name=u"班号")
    class_name = models.CharField(max_length=100, verbose_name=u"班级名称")

    class Meta:
        db_table = "Class"
        verbose_name = verbose_name_plural = u"班级信息"

    def __str__(self):
        return self.class_name
