const mongoose = require('mongoose');


//1.声明schema
let studentSchema = new mongoose.Schema({
    sid : Number , //学生的学号
    name : String , //名字
    sex : String , //性别
    age : Number //年龄    
});
//获取某一页学生数据
studentSchema.statics.findPageData = async function (page,callback){
    //分页:
    let pageSize = 4; //一页4条数据
    let start = (page - 1) * pageSize; //起始位置
    let count = await this.find().countDocuments(); //获取数据总条数
    this.find({}).sort({'sid':-1}).skip(start).limit(pageSize).exec(function (err,results){
        if( err ){
            callback(null);
            return;
        }
        callback({
            results, //查出来的那一页的四条数据
            count, //数据总条数
            length : Math.ceil(count / pageSize), //一共多少页
            now : page // 当前在那一页
        });
    })
}
//修改学生信息:
studentSchema.statics.changeStudent = function (sid,data,callback){
    this.find({sid},(err,results)=>{
        //console.log(results);
        var somebody = results[0];
        somebody.name = data.uname;
        somebody.sex = data.sex;
        somebody.age = data.age;
        somebody.save((err)=>{
            if( err ){
                callback(-1); //修改失败
                return;
            }
            callback(1); //修改成功
        });
    });
}
//通过正则做模糊搜索
studentSchema.statics.findStudentNames = function (reg,callback){
    //let val = new RegExp(reg,'g');
    //let val = eval(`/${reg}/g`);
    this.find(
        {name:{$regex:reg,$options:'$g'}},
        (err,results)=>{
            if(err){
                callback({error:0,data:null});
                return;
            }
            callback({error:1,data:results});
        }
    );
}
//2.初始化Student类 该类会声明一个名为students的集合
let Student = mongoose.model('Student',studentSchema);

//3.导出集合
module.exports = Student;