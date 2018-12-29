
var mysql      = require('mysql');
const app = require('express');
// const utility = require('utility'); //加密模块
const router = app.Router();
// const UserModel = require('../model.js');  //数据库结构
// const User = UserModel.getModel('user');
var querystring = require('querystring');

console.log("厉害");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'userinfo'
});

connection.connect();












router.get('',function (req,res,next) {
    console.log(1112123121312123123);
})


router.post('/userRegiste',function (req,res,next) {
    var username=req.body.username;
    var password=req.body.password;

    connection.query("select * from `user` where password='123456'", function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });





    // res.send(req.body)

})




// exports.user=(req, res, next)=>{
//     // res.send("11111111")
//     //对request请求的url进行判断，是否为post方法
//     if(req.method.toLowerCase() =="post"){
//         //创建一个空的字符串变量用于对post数据进行拼接
//         var postData = "";
//
//         res.send("1111111111111111")
//
//
//         //request请求正在接收数据
//         // req.addListener("data",function (chunk) {
//         //     postData += chunk;
//         //     console.log(postData);
//         // })
//         // //数据接收完后进行数据的读取和解析
//         // req.addListener("end",function () {
//         //
//         //     var dataString = querystring.parse(postData.toString());
//         //     res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
//         //     res.send("username:"+dataString.username+"\n");
//         //     res.send("password:"+dataString.password+"\n");
//         //     res.end();
//         // })
//     }
// }




module.exports = router;