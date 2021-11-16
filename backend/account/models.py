from django.contrib.auth.models import AbstractUser
from django.db import models


class AdminType(object):
    STUDENT = "Student"
    TEACHING_ASSISTANT = "Teaching_Assistant"
    TEACHER = "Teacher"

class User(AbstractUser):
    student_name = models.CharField(max_length=30, verbose_name=u"姓名")
    student_number = models.CharField(max_length=11, verbose_name=u"学号")
    admin_type = models.TextField(default=AdminType.STUDENT, verbose_name=u"用户类型")
    class_info = models.IntegerField(null=True)

    class Meta:
        db_table = "User"
        verbose_name = verbose_name_plural = u"用户信息"


class Class(models.Model):
    teacher = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name=u"授课教师")
    class_number = models.IntegerField()
    class_name = models.TextField()

    class Meta:
        db_table = "Class"
        verbose_name = verbose_name_plural = u"班级信息"
