# 2021秋软件工程第7组：文科计算机考试平台

## 前端部署
考虑到服务器环境，提供ubuntu20下前端部署指南。

首先保证你的ubuntu中安装了nodejs（npm会随着nodejs自动一并安装）,以及vue/cli，且后者版本在4.0以上：
```
vue --version
```

然后使用vue-cli生成一个脚手架：
```
vue create [项目名]
```

由于我们需要vue2.x的环境，还要为之后的单元测试做准备，接下来的配置请参考这篇文章：
https://blog.csdn.net/qq_39759115/article/details/106421132
根据我踩的坑，在这篇文章的基础上，建议将 Sass/SCSS (with node-sass) 改为 Sass/SCSS (with dart-sass)，因为前者容易安装失败。

接下来，用github仓库中的src覆盖掉项目目录中的src，在项目根目录中运行
```
npm run serve
```

如果有package未安装，按照npm的提示安装对应的package即可。然后再次启动。

## 后端部署
[![Python](https://img.shields.io/badge/python-3.8.10-red.svg?style=flat-square)](https://www.python.org/downloads/release/python-3810/)
[![Django](https://img.shields.io/badge/django-3.2.9-red.svg?style=flat-square)](https://www.djangoproject.com/)
[![Django Rest Framework](https://img.shields.io/badge/django_rest_framework-3.12.4-red.svg?style=flat-square)](http://www.django-rest-framework.org/)

在将项目Clone后，请先确保环境中已安装MySQL。

之后进入backend文件夹，安装Python相关的依赖库`pip install -r requirements.txt`。

打开`/backend/settings.py`文件，对`DATABASES`进行设置。

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '',				# 你的MySQL中的想用于部署的表名
        'USER': 'root',			# 你的MySQL用户名
        'PASSWORD': '',			# 你的MySQL密码
        'HOST': '127.0.0.1',	# 想使用远程的数据库的话就设置为其ip地址
        'POST': '3306',			# 你设置的MySQL端口
    }
}
```

之后分别执行`python manage.py makemigrations`，`python manage.py migrate`生成数据库中的表。

最后`python manage.py runserver`即可启动后端。



## 判题服务器部署

使用的是https://github.com/QingdaoU/JudgeServer

其部署方式见https://opensource.qduoj.com/#/judgeserver/deploy

完成部署后在存有`docker-compose.yml`的目录下执行`docker-compose up`即可启动判题服务器。



## 鸣谢

[青岛大学OnlineJudge](https://github.com/QingdaoU/OnlineJudge)完整地展示了如何通过Django+Vue搭建一个OJ系统，给予了我们非常大的启发。
