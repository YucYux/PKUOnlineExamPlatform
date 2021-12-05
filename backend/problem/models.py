from django.db import models
from django.db.models import JSONField

from ..contest.models import Contest


class ProblemTag(models.Model):
    name = models.TextField(verbose_name=u'标签名称')

    class Meta:
        db_table = "Problem_Tag"
        verbose_name = verbose_name_plural = u"题目标签"


class ProblemType(object):
    ALGORITHM = "Algorithm"
    FILE_IO = "File_IO"


class Problem(models.Model):
    """
    TODO：算法/文件IO题
    因为Judger还没研究明白，先只考虑算法题
    """
    _id = models.TextField(db_index=True, verbose_name=u'题目ID')
    contest = models.ForeignKey(Contest, null=True, on_delete=models.CASCADE, verbose_name=u'所属考试')
    title = models.TextField(verbose_name=u'题目标题')
    description = models.TextField(verbose_name=u'题目描述')
    input_description = models.TextField(verbose_name=u'输入描述')
    output_description = models.TextField(verbose_name=u'输出描述')
    # [{input: "test", output: "123"}, {input: "test123", output: "456"}]
    samples = JSONField(verbose_name=u'输入输出样例')
    time_limit = models.IntegerField(verbose_name=u'时间限制')  # ms
    memory_limit = models.IntegerField(verbose_name=u'内存限制')  # MB
    difficulty_choices = (
        ('Easy', u'简单'),
        ('Medium', u'中等'),
        ('Hard', u'困难'),
    )
    difficulty = models.TextField(choices=difficulty_choices, verbose_name=u'题目难度')
    tags = models.ManyToManyField(ProblemTag, verbose_name=u'题目标签')
    type_choices = (
        (ProblemType.ALGORITHM, u"算法"),
        (ProblemType.FILE_IO, u"文件IO"),
    )
    type = models.CharField(max_length=20, choices=type_choices,
                            default=ProblemType.ALGORITHM, verbose_name=u'题目类型')
    test_case_id = models.TextField(verbose_name=u'输入输出文件存储ID')

    class Meta:
        db_table = "Problem"
        unique_together = (("_id", "contest"),)
        ordering = ("_id",)
        verbose_name = verbose_name_plural = u"题目"
