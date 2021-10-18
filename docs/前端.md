- [x] 本文档为前端实现。

已部署：https://www.zzzs.ml/exam/

# 0.页面跳转逻辑

所有页面全部独立。

理由：

1.便于同时打开多个窗口操作

2.

所有页面：

1.index.html主页，内容可变

2.404.html重定向页，资源找不到

3.50x.html重定向页，服务器挂了

4.login.html登录页

5.exam.html考试页

~~6.question.html题目页~~<b style='color:red'>[暂时不开发，等到摇身一变，成为练习平台时再说]</b>

7.management.html只有这个页面是集成的，包括了

7.1manageUser用户页，管理学生、助教、老师、管理员的权限与信息

7.2manageExam考试页，管理考试

7.3manageQuestion题目页，管理题库

~~7.4managePaper试卷页，管理试卷库~~<b style='color:red'>[依然暂时不开发，因为考试平台的考试与试卷是完全绑定的]</b>

8.新建（注意：这些页面不一定必须独立）

8.1createQuestion.html创建新题目

8.2createPaper.html创建新试卷

8.3createExam.html创建新考试<b style='color:red'>[在当前设计中，令createPaper的下一步就是用添加考试信息]</b>

# 1.功能

## 1.1用户

当前用户的用户状态应当用一个对象存储，该对象应包括以下内容：

1.类型：学生、教师、管理员、助教

2.用户名

3.会话id，用于标记登录状态

4.登录方法<b style="color:red">[扩展：记住用户名、记住密码、记住登录状态]</b>

5.注销方法

6.更新方法（如，当修改信息、权限后）

7.自动注销方法（使用cookie实现，如，约定15分钟无操作，服务器就自动注销用户）

该对象应向前端与后端提供以下接口：

1.登录接口（如无必要，可直接调用相应方法）

2.注销接口

3.修改接口

### 1.1.1添加用户

输入：`用户名`、`密码`<b style='color:red'>[、班级....]</b>

输出：`成功/失败`

实现：

1. 前端获取`用户名`、`密码`<b style='color:red'>[及其他信息，如验证码]</b>
2. 定义`合法字符`、`合法长度`、安全性
3. 若`用户名`、`密码`为空，则提示
4. 若不合法，则提示
5. 若不安全，则提示
6. 将`用户名`、`密码`进行加密<b style='color:red'>[出于安全性考虑？]</b>
7. 将数据发送给服务器<b style='color:red'>[后端]</b>
8. 若发送失败，则提示
9. 若返回结果为注册失败，则提示

补充：

1. 包括其他信息，如班级、年级、性别、院系、考号、ip

#### 1.1.1.1批量添加用户

输入：`一个数组`

输出：`成功/失败`

实现：略

```javascript
function addStudentsFromArray(arr){
    if(!arr) arr=[[]];
    arr=ajax("/api/addStudents",{
        data:JSON.stringify(arr)
    });//assume ajax is an API.
    for(let stu of arr){
        //register stu
    }
}
function readStudentsFromExcel(file){
    //use some API to read a .csv or .xlsx file
    return [[]];
}
function importStudents(file){
    return addStudentsFromArray(readStudentsFromExcel(file));
}
```



### 1.1.2登录

输入：`用户名`、`密码`

输出：`成功/失败`

实现：

1. 获取`用户名`、`密码`
2. 定义`合法字符`<b style='color:red'>[安全：防止XSS等攻击，如果在服务器端拦截也可以]</b>
3. 若为空，则提示
4. 若不合法，则提示
5. 加密<b style='color:red'>[安全？]</b>
6. 发生给服务器<b style='color:red'>[后端]</b>
7. 若发送失败，则提示
8. 若返回结果为登录失败，则提示
9. 存储`当前用户状态`
10. 刷新页面

```javascript
//本函数为demo中的示例，可以在global.js中找到
function login() {
    var original_url = "https://iaaa.pku.edu.cn/iaaa/oauth.jsp?appID=syllabus&appName=%E5%AD%A6%E7%94%9F%E9%80%89%E8%AF%BE%E7%B3%BB%E7%BB%9F&redirectUrl=http://elective.pku.edu.cn:80/elective2008/ssoLogin.do";//iaaa的网址，仅作展示用
    var user_name = zzz.get("input")[0],
        password = zzz.get("input")[1];//zzz是我自己写的库，然后我用它获取了input的value
    if (!user_name.value) user_name.setAttribute("placeholder", "请填写学号");//违法数据处理
    else if (!password.value) password.setAttribute("placeholder", "请输入密码");
    else {//发送合法数据
        var token_url = "https://iaaa.pku.edu.cn/iaaa/oauthlogin.do";
        var redirect_url = "main.html";//iaaa拒绝了我们的连接，所以没有办法直接跳转
        var res = zzz.fetch.ajax({//使用AJAX发送请求
            url: token_url,
            method: "POST",
            data: "appid=syllabus&userName=" + user_name.value + "&password=" + password.value + "&redirUrl=" + zzz.code.path.encode("http://elective.pku.edu.cn:80/elective2008/ssoLogin.do"),
            header: {
                "Host": "iaaa.pku.edu.cn",
                "Origin": "https://iaaa.pku.edu.cn",
                "Referer": "https://iaaa.pku.edu.cn/iaaa/oauth.jsp?appID=syllabus&appName=%E5%AD%A6%E7%94%9F%E9%80%89%E8%AF%BE%E7%B3%BB%E7%BB%9F&redirectUrl=http://elective.pku.edu.cn:80/elective2008/ssoLogin.do",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            async: false
        }).responseText;
        var js = JSON.parse(res);//解析从iaaa传来的数据
        console.log("fetch=", js);
        if (!js.token) {//如果不对，则显示错误
            password.value = "";
            password.setAttribute("placeholder", js.msg || "发生了其他错误");
            return;
        }
        var status = {//否则登录成功，更新用户状态（我随便实现了一下）
            name: user_name.value,
            token: js.token,
            time: zzz.time.now(),
            other_information_from_server: undefined
        };
        zzz.storage.json("status", status);//存储状态，防止浏览器关闭后，内存中的信息全部消失
        location.replace(redirect_url);//跳转到main.html
    }
}

```



### 1.1.3注销

输入：`当前用户状态`

输出：无

实现：

1. 更新`当前用户状态`
2. 刷新页面

### 1.1.4删除用户

输入：`用户名`、`当前用户状态`

输出：`成功/失败`

实现：

1. 判断`当前用户状态`是否拥有删除权限，若没有，则提示
2. 判断用户名合法性，若不，则提示
3. 请求服务器删除用户账号
4. 提示删除是否成功

补充：

2. 批量删除
3. 实现回收站功能，防止误删

### 1.1.5查询用户

输入：`班级等条件`

输出：`用户数组`

## 1.2题库



### 1.2.1创建题库

### 1.2.2添加题目

### 1.2.3删除题目

### 1.2.4修改题目

### 1.2.5查询题目

### 1.2.6<del style='color:red'>删库跑路</del>

## 1.3试卷

试卷应当用一个对象存储，包括：

1.标题

2.内容

3.id等外部信息

### 1.3.1试卷的存储结构

试卷内容应当用一个对象数组存储，每个对象包括一道题目。

存储方式可以是：

1.仅主键

2.加载描述信息（如标题）

3.完全存储

相应的加载方式是：

1.前端读取试卷的json，遍历每道题目，根据主键向后端请求题目内容

2.....................................，先渲染一些能渲染的，然后.....................................

3.一次性渲染完成

### 1.3.2试卷编辑器

该编辑器应提供以下接口：

1.从题库添加题目

2.删除题目

3.新建题目，需要调用题目编辑器

4.导出试卷，将其转为一个json存储

### 1.3.3外部接口

为了实现与jupyter notebook对接，可以实现以下接口：

1.readFromJupyter，从一个.ipynb文件创建新试卷

2.writeToJupyter，将一张试卷导出为.json文件，该文件能兼容jupyter

用途：由于能够导出试卷，以后老师发布作业时可以选择本平台，只需要导入一张试卷文件，或从服务器读取一张试卷即可。

## 1.4题目

一个题目应当用一个对象存储，包括以下内容：

1.类型：单项选择题、多项选择题、填空题、代码题

2.样式：我目前参考中国大学mooc的练习，发现选择题的排版有横排（短）和竖排（长）两种；另外，填空题也可以有短填空和长填空两种

3.内容：略

4.正确答案/判分函数

5.标签

6.id等外部信息

例：一个简单的实现

```javascript
var question={
    type:"single",
    title:"",
    content:[
        
    ],
    choice:["A","B","C","D"],
    answer:0,
    score:function(answer){return(this.answer===answer)}
    id:354848959,
    tag:["single","python","easy"]
}
class choice={
    contentType:"text"|"latex"|"image"|"HTMLElement"
    content:""
}
```

但是，为了兼容jupyter notebook，题目应当设计成多块内容的数组，即选择题=[标题、选项]，填空题=[标题、题干、答题区域]，代码题=[标题、题干、输入示例、输出示例、时间空间限制、答题区域]。有必要考虑题干中除了文本外，还有图片、表格、代码的情况。

```javascript
var question={
    type:"single",
    content:[
        {
            type:"title",
            content:"<p></p>"
        },
        {
            type:"img",
            content:"<img src=''/>"
        },
        {
            type:"choice_single",
            choice:["A.","B.","C.","D."]//不可以用HTML写，因为需要临时绑定事件；相反，是在里面写HTML，比如"<p>A.</p><i></i>"
        }
    ],
    answer:0,
    score:function(answer){return(this.answer===answer)}
    id:354848959,
    tag:["single","python","easy"]
}
```

最终这些内容需要被解释成HTML语言存储，如图片需要解释成`<img>`标签。

补充：

1.可以考虑支持markdown语法（一些库可以很方便地把markdown转成HTML，如marked.js）

### 1.4.1富文本编辑器

请不要尝试自己写编辑器，应该去找现成的库包装一下，这个库至少应该支持除了代码、附件外的其他所有我们需要的功能，而代码区域可以自己魔改一下插到库里。

该编辑器应当用一个对象存储，在前端提供以下接口：

1.编辑文本（插入、删除、修改）

2.编辑图片

3.编辑表格

4.编辑代码区域

5.从剪贴板粘贴文本时，自动转换成对象。比如粘贴markdown语言，转换成HTML元素

6.添加附件（比如一个有待处理的word文档，需要下载到本地查看）

补充：

1.可以考虑支持数学公式

该编辑器应当向后端提供以下接口：

1.解释成HTML语言，得到一个jsonp

2.将jsonp渲染成HTML元素，并更新UI

### 1.4.2代码编辑器

当前方案请使用monaco.js

代码编辑器应当提供以下功能：

1.读取文本并编码为jsonp

2.将jsonp上传到服务器运行，并等待判分结果返回

3.将判分结果解析成一个对象，然后更新UI

4.<b style='color:red'>[扩展：支持在浏览器跑简单程序，并给出输出]</b>其中python语言已经可以用brython.js实现。

5.<b style='color:red'>[扩展：支持连接本地服务器，如jupyter notebook、vs code web版]</b>

6.<b style='color:red'>[扩展：支持交互式界面，即一个CLI窗口]</b>

### 1.4.3判分函数的实现

指定默认的判分函数实现为

1.单项选择题：一个整数

2.多项选择题：一个位图

3.填空题：一个字符串，或一个正则表达式

4.代码题：一个文件比对程序

允许教师自定义判分函数实现为function(answer,[...其他信息]){return score;}

1.用javascript语言书写的函数，运行在浏览器上

2.用python或其他任何服务器支持的语言书写的函数，运行在服务器上

<b style='color:red'>[扩展：特别地，当教师不愿意使用平台提供的服务时，应当能够让教师下载指定学生的回答的excel文件（格式可能是.csv .txt等）在本地跑完，然后平台读取教师生成的excel文件]</b>

### 1.4.3~~历史记录~~

设计一个版本控制系统，支持回滚。

## 1.5考试

一场考试应当用一个对象存储，包括：

1.试卷（可以选择仅主键或完全加载）

2.开始时间与结束时间

### 1.5.1权限控制

不允许学生进入考试，除非同时满足以下要求：

1.学生拥有考试权限

2.当前服务器时间介于开始时间与结束时间之间

不允许学生提交答案，除非同时满足以下要求：

1.学生拥有考试权限

2.当前服务器时间介于开始时间与结束时间之间

3.本题已作答（或全部必须回答的题目均已作答）

### 1.5.2渲染器

渲染器的主要功能是读取试卷的jsonp数据，并解释成HTML元素。

### 1.5.3自动备份回答

为了防止学生误关闭浏览器，应当每隔x秒，每当学生修改答案时，就帮他备份当前答案到本地存储中。

为了从备份恢复选择，应当在每次进入考试时检查有没有更加新的备份

为了删除备份，应当在考试结束后立即删除当前考试的备份。<b style='color:red'>[本功能可以简单地用cookie实现，但不清楚其容量够不够]</b>

### 1.5.4提交回答与判分



### 1.5.5统计信息

如，一共有x次尝试，其中WA、RE、CE、TLE、MLE、AC等的数量有y次，当前ACz人，尝试w人

# 2.UI

## 2.1样式

### 2.1.1字体

### 2.1.2配色

### 2.1.3

## 2.2布局

## 2.2.1排版...

# 3.性能与质量

1. 支持1000人级别的操作。<b style='color:red'>[压力测试]</b>

# 4.部署

## 4.1服务器

### 4.1.1端口

### 4.1.2网关

## 4.2域名

<b style='color:blue'>1.申请一个*.pku.edu.cn;2.申请一个独立域名;3.由老师提供;4.不提供</b>

<b style='color:red'>国内要备案</b>

## 4.3DNS解析

<b style='color:blue'>找个可靠的服务商</b>

