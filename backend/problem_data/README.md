# generate_info使用说明

由于判题服务器使用的是QDU开源的Judge Server，其对题目输入输出文件的存储格式有特殊的要求，所以需要按照其要求对输入输出文件进行相应的处理。

用法是在当前目录下创建名为【题号】的文件夹，注意该题号要和后端Problem中的_id相对应，之后将题目的输入输出文件（需要命名成1.in/1.out/...以此类推）打包成test_case.zip。之后再运行generate_info即可。

# 鸣谢
https://github.com/QingdaoU/JudgeServer