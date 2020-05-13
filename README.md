# Node开发的学生管理系统
`技术栈: Node+express+mongodb+mongoose+bootstrap+jquery`

## 项目启动
`cnpm install / cnpm i`
`node app.js`

* 项目结构说明：
> models M : 模型,处理数据
> controllers C : 控制器,命令模型操作数据并呈递视图
> views V : 视图,通过ejs模板引擎渲染的页面
> public : 存放一些静态资源(image,css,icon,js)
> data : 模拟数据(需要导入到mongodb内 比如：mongoimport -d sm -c students data/student.txt)

git init (在Git Bash Here 上输入指令 ) 把一个目录初始化为git仓库
----------------------
npm init (在 VSCode 上输入指令) 初始化包的说明 package.json
----------------------

data文件夹 admin.txt和student.txt导入数据库


从sm数据库中的admins集合中导入admin.txt文件 ( sm 代表student-management)
mongoimport -d sm -c admins admin.txt 
---------------------
从数据库中导出内容
mongoimport -d sm -c students student.txt 
----------------------


安装相关插件 模块
**cnpm install mongoose express cookie-session md5-node ejs formidable --save**

提交到git上(复习)
- git init 先初始化仓库
- git add *
- git commit -m '文件上传'
- git status 查是否已经上传完
- git log 查操作步骤
- git log --oneline 打印成一行


##### 举例
PHP开发中
一个文件一个功能 一个功能就是一个路由 但不优雅
http://localhost/showStudent.php?sid=100001
http://localhost/delStudent.php?sid=100001
http://localhost/updateStudent.php?sid=100001

近几年流行的一个叫做RESTful的路由风格, 不管是对于一个学生的操作还是对一个商品的操作 都在同一个url下进行,通过判断HTTP请求类型的不同,来决定做不同的事
http://localhost/student/:xuehao (/100002) get请求,访问学生信息
http://localhost/student/:xuehao (/100002) post请求,修改学生信息
http://localhost/student/:xuehao (/100002) propfind请求,查看学号是否被占用

express框架非常方便制作RESTful风格的路由