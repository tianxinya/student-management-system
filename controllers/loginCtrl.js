
///////////登录块/////////////////

const formidable = require('formidable'),
      Admin = require('../models/Admin');
      
//渲染登录页:
exports.showLogin = function (req,res){
    if( req.session['s_id'] ){ //如果已经登录过 就不需要访问登录页面了.
        res.redirect('/');
        return;
    }
    //设置了ejs模板引擎 通过render渲染login时它就会自动到views目录下寻找名为login.ejs的模板文件进行渲染
    res.render('login');
}
//处理登录
exports.doLogin = function (req,res){
    let form = formidable();
    form.parse(req,(err,fields)=>{
        // 成功或失败了会接收到一个回调函数 function(data){}
        Admin.checkLogin(fields,function (data){
            //console.log(data);
            if( data == 1 ){ //如果登录成功 种session
                req.session['s_id'] = fields.username; // s_id是自己设置的
            }
            res.send(`${data}`);
            //res.json(data);
        });
    })
}
//验证用户是否存在
exports.checkUser = function (req,res){
    let form = formidable();
    form.parse(req,(err,fields)=>{ 
        if( err ){
            res.json({result : false});
            return;
        }     
        Admin.checkUser(fields.username,function (val){
            /*
            console.log(val);
            {
                t: true,
                val: {
                    _id: 5eb51122ca91035eff480e7b,
                    username: 'tianxinya',
                    password: 'e10adc3949ba59abbe56e057f20f883e',
                    posttime: 1588143508747,
                    lastLoginTime: 1588143508747
                }
            }
            */
            res.json({result : val.t });
        });
    });
}


