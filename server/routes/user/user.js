
var mysql      = require('mysql');
const app = require('express');
const router = app.Router();
var querystring = require('querystring');
const multer = require('multer')
var session = require('express-session');
let fs = require('fs');
var upload = multer({
    dest: '../../public'
});//定义图片上传的临时目录


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'Userinfo'
});

connection.connect();






router.post('/uploads', upload.array('img', 5), function(req, res, next) {
    // req.files 是 前端表单name=="imageFile" 的多个文件信息（数组）,限制数量5，应该打印看一下
    for (var i = 0; i < req.files.length; i++) {
        // 图片会放在uploads目录并且没有后缀，需要自己转存，用到fs模块
        // 对临时文件转存，fs.rename(oldPath, newPath,callback);
        fs.rename(req.files[i].path, "public/" + req.files[i].originalname, function(err) {
            if (err) {
                throw err;
            }
            console.log('done!');
        })
    }

    // res.writeHead(200, {
    //     "Access-Control-Allow-Origin": "*"//允许跨域。。。
    // });
    // req.body 将具有文本域数据, 如果存在的话
    res.end(JSON.stringify(req.files)+JSON.stringify(req.body));
})







router.get('',function (req,res,next) {
    console.log(1112123121312123123);
});

router.get('/userinfo',function (req,res,next) {
    console.log(req.session.data);
    res.send(req.session.data);
})


router.post('/userRegiste',function (req,res,next) {
    var name=req.body.username;
    var pass=req.body.password;
    let sql= `INSERT INTO user(username,password) VALUES ("${name}","${pass}");` ;
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        if(results.affectedRows==1){
            res.send({
                data:[],
                msg:"注册成功",
                state:1
            })
            // connection.release(); // 释放连接池的连接
        }else if(results.affectedRows!=1){
            res.send({
                data:[],
                msg:"注册失败",
                state:0
            })
        }
    });
});
router.post('/cheackUsernameIsExist',function (req,res,next) {
    var name=req.body.username;
    let  sql=`SELECT * FROM user WHERE username="${name}"`;
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    });
})
router.post('/login',function (req,res,next) {
    let name=req.body.username;
    let pass=req.body.password;
    let  sql=`SELECT username,id FROM user WHERE username="${name}" AND password="${pass}"`;
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        var obj={};
        if(results.length===1){
             obj={
                data:results,
                msg:"登陆成功",
                state:1
            }
            req.session.data=results;
            console.log(req.session.data);
        }else if(results.length===0){
             obj={
                data:[],
                msg:"账号或密码错误",
                state:0
            }
        }
        res.send(obj)
    });
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