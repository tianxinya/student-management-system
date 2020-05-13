/* 启动入口文件(主文件) */
const express = require('express'),
      //mongoose内依赖自动有mongodb,所以不需要再次安装或引入mongodb
      mongoose = require('mongoose'),
      cookieSession = require('cookie-session'),
      loginCtrl = require('./controllers/loginCtrl'),
      studentCtrl = require('./controllers/studentCtrl');

//链接数据库 端口号不需要写,最后的反斜杠是操作的数据库名称
mongoose.connect('mongodb://localhost/sm',{useUnifiedTopology:true,useNewUrlParser:true});

//起服务
let app = express();
//设置模板引擎
app.set('view engine','ejs');
//使用session
app.use(cookieSession({
    name:'sess_id',
    keys:['key1'],
    maxAge : 30 * 60 * 1000 //30min
}))

//处理静态资源请求:
app.use(express.static('public'));

//登录验证: 验证如果没有登陆过不能访问管理界面的任何内容
app.use((req,res,next)=>{      
    if( !req.session['s_id'] && req.url != '/login' ){ //没有s_id证明没有登陆过
        res.redirect('/login');
        return;
    }
    next();
});

//路径清单:
app.get('/login',loginCtrl.showLogin); //访问登录页面
app.post('/login',loginCtrl.doLogin); //访问登录接口 处理登录操作
app.propfind('/login',loginCtrl.checkUser); //访问接口 验证用户名是否存在

app.get('/',studentCtrl.showIndex); //访问首页
app.get('/student/msg',studentCtrl.showList);//访问接口 处理学生数据 
app.get('/student/search',studentCtrl.searchStudent); //访问接口 处理搜索学生
app.post('/student/:sid',studentCtrl.updateStudent);//访问接口 处理修改学生数据

//监听端口
app.listen(3000);
console.log('服务器已经启动 端口为3000');


