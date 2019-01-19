
var mysql = require('mysql');
const app = require('express');
const router = app.Router();
var querystring = require('querystring');

var session = require('express-session');




console.log("厉害");
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'Userinfo'
});

connection.connect();












router.get('/getMyBill',function (req,res,next) {
    // console.log(1112123121312123123);
    var userId=req.session.data[0].id;
    console.log(userId);

    let sql=`select defineName,userId,sum(money) from user_bank_map where userId=${userId} group by userId,defineName`

    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
            res.send({
                data:results,
                msg:"查询成功",
                state:1
            })
    });





});

// router.get('/userinfo',function (req,res,next) {
//     res.send(req.session.data);
// })
//
//
// router.post('/userRegiste',function (req,res,next) {
//     var name=req.body.username;
//     var pass=req.body.password;
//     let sql= `INSERT INTO user(username,password) VALUES ("${name}","${pass}");` ;
//     connection.query(sql, function (error, results, fields) {
//         if (error) throw error;
//         if(results.affectedRows==1){
//             res.send({
//                 data:[],
//                 msg:"注册成功",
//                 state:1
//             })
//             // connection.release(); // 释放连接池的连接
//         }else if(results.affectedRows!=1){
//             res.send({
//                 data:[],
//                 msg:"注册失败",
//                 state:0
//             })
//         }
//     });
// });
// router.post('/cheackUsernameIsExist',function (req,res,next) {
//     var name=req.body.username;
//     let  sql=`SELECT * FROM user WHERE username="${name}"`;
//     connection.query(sql, function (error, results, fields) {
//         if (error) throw error;
//         res.send(results)
//     });
// })
// router.post('/login',function (req,res,next) {
//     let name=req.body.username;
//     let pass=req.body.password;
//     let  sql=`SELECT username FROM user WHERE username="${name}" AND password="${pass}"`;
//     connection.query(sql, function (error, results, fields) {
//         if (error) throw error;
//         var obj={};
//         if(results.length===1){
//             obj={
//                 data:results,
//                 msg:"登陆成功",
//                 state:1
//             }
//             req.session.data=results;
//             console.log(req.session.data);
//         }else if(results.length===0){
//             obj={
//                 data:[],
//                 msg:"账号或密码错误",
//                 state:0
//             }
//         }
//         res.send(obj)
//     });
// })

module.exports = router;