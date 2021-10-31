# account

该APP主要实现的是用户系统相关的功能。



## `models.py`
定义了权限级别：

- 学生
- 助教
- 老师

> 实际上应该还有超级管理员这一级别，但可以通过在服务器后台`create superuser`来实现完全的后台管理，所以去掉了这一级别。

同时定义了用户模型，采用的是扩展Django中`auth.models`模块的`AbstractUser`类来实现的，除默认字段（`username`，`password`）外加入了：

- 学生姓名`student_name`
- 学号`student_number`
- 权限类型`admin_type`
- 班号`class_number`

采用扩展`AbstractUser`类的方法保留了进一步增加字段的空间。

> 注意扩展`AbstractUser`类需要在`settings.py`和`admin.py`中都加入一些相关代码，具体见代码文件。

如果需要更多自定义操作，可以考虑改为继承`AbstractBaseUser`类以彻底重写用户模型（不过太复杂了orz）。

> 如果后续对接IAAA的话，那其实这里的设计就针对IAAA返回的数据即可。



## `serializers.py`

因为使用了DRF框架所以要有序列化相关的操作。

目前共有两个序列化器：

1. `UserRegisterSerializer`，用于用户注册时读取用户名和密码，注意因为该序列化器承担了注册用户的任务，所以要定义`create`函数并在其中加入生成用户的内容
2. `UserLoginSerializer`，用于用户登录时读取用户名和密码



## `views.py`

目前实现了三个接口：

1. `UserRegisterAPI`，用于用户注册，前端需要向后端发送包含`username`和`password`的json数据，后端会返回注册结果
2. `UserLoginAPI`，用于用户登录，前端需要向后端发送包含`username`和`password`的json数据，后端会返回登录结果
3. `UserLogoutAPI`，用于用户登出



## `urls.py`

主路由中通过`user/`后缀会转移到`account/urls.py`中，具体后缀与接口的对应为：

1. `register/`用户注册
2. `login/`用户登录
3. `logout/`用户登出

