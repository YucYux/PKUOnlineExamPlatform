from django.db import models
from django.db.models import JSONField

from contest.models import Contest


class ProblemTag(models.Model):
    """
    题目Tag的字段
    """
    name = models.TextField(verbose_name=u'标签名称')

    class Meta:
        db_table = "Problem_Tag"
        verbose_name = verbose_name_plural = u"题目标签"

    def __str__(self):
        return self.name


class ProblemType(object):
    """
    题目类型，目前尚不支持文件IO
    """
    ALGORITHM = "Algorithm"
    FILE_IO = "File_IO"


class Problem(models.Model):
    """
    题目的字段
    TODO：算法/文件IO题
    因为没有找到支持文件IO的沙箱，先只考虑算法题
    以及一个小问题，是Django+MySQL配合的问题，就是题目要有属于的考试这样一个字段，很显然题目和考试应该是多对多的关系，
    即一个题目可以属于多场考试，一场考试也可以有多个题目
    但是Django要求ManyToManyField不能为空，即一个题目被创建出来必须属于一场考试，不是很合理
    目前的处理办法是必须建立一个"元考试"，所有题目都属于该考试以保证题目可以被创建，后续可以再继续添加给其他考试
    还有一个小问题就是一个考试必须属于一个班级，所以为"元考试"又必须设立一个"元班级"
    """
    _id = models.CharField(db_index=True, max_length=100, verbose_name=u'题目ID')
    contest = models.ManyToManyField(Contest, verbose_name=u'所属考试')
    title = models.TextField(verbose_name=u'题目标题')
    description = models.TextField(verbose_name=u'题目描述')
    input_description = models.TextField(verbose_name=u'输入描述')
    output_description = models.TextField(verbose_name=u'输出描述')
    # samples的一个例子：[{input: "test", output: "123"}, {input: "test123", output: "456"}]
    samples = JSONField(verbose_name=u'输入输出样例')
    time_limit = models.IntegerField(default=3000, verbose_name='时间限制')  # ms
    memory_limit = models.IntegerField(default=128 * 1024 * 1024, verbose_name='内存限制')  # MB
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
        ordering = ("_id",)
        verbose_name = verbose_name_plural = u"题目"

    def __str__(self):
        return self._id + '.' + self.title