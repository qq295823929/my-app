

const app = require('express');
const router = app.Router();
var querystring = require('querystring');

var session = require('express-session');
var connection=require('../../config/mysql')



// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '123456',
//     database : 'Userinfo'
// });

connection.connect();



router.get('/getMyBill',function (req,res,next) {
    // console.log(1112123121312123123);
    var userId=req.session.data[0].id;
    console.log(userId);

    // let sql=`select defineName,userId,sum(money) from user_bank_map where userId=${userId} group by userId,defineName`
    let sql=` select b.id as defineId,b.defineName,a.id,a.userId,IFNULL(a.money,0) money,a.createDate,c.username, `+
            ` (select IFNULL(sum(d.money),0) from user_bank_map d where d.defineId = a.defineId and d.userId = a.userId) totalMoney ` +
            ` from bank b `+
            ` left join user_bank_map a on a.defineId = b.id and a.userId =  b.userId `+
            ` left join user c on a.userId = c.id `+
            ` where b.userId = ${userId} `+
            ` order by b.id `;
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        let list=[];
        for(let i=0;i<results.length;i++){
            let pushFlag=true;          //定义一个是否包含的标记
            for(var j=0;j<list.length;j++){
                if(results[i].defineId==list[j].difineId){          //如果是之前有过的银行,就将这条记录加到银行中去;
                    pushFlag=false
                    list[j].list.push(results[i]);
                    break;
                }else{        //说明这是第一次出现这个银行,就要新建一个关于银行的对象

                }
            }
            if(pushFlag==true){
                let obj={
                    name:results[i].defineName,
                    difineId:results[i].defineId,
                    total:results[i].totalMoney,
                    list:[]
                }
                obj.list.push(results[i])
                list.push(obj)
            }
        }
        res.send({
            data:list,
            msg:"查询成功",
            state:1
        })
    });
});

router.post('/getMyBillDetailById',function (req,res,next) {
    // console.log(1112123121312123123);
    let userId=req.session.data[0].id;
    let defineId=req.body.id
    // console.log(userId+"2222222222222222222222222222222");


    // let sql=`select defineName,userId,sum(money) from user_bank_map where userId=${userId} group by userId,defineName`
    let sql=` SELECT  *  from  user_bank_map  WHERE  userId= ${userId} AND  defineId= ${defineId}`;
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send({
            data:results,
            msg:"查询成功",
            state:1
        })
    });
});




router.post('/addBank',function (req,res,next) {
    var userId=req.session.data[0].id;
    var bankName=req.body.bankName
    let sql=`INSERT INTO bank(defineName,userId) VALUES ("${bankName}","${userId}");`
    try{
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;

            if(results.affectedRows==1){
                res.send({
                    data:[],
                    msg:"添加成功",
                    state:1
                })
                // connection.release(); // 释放连接池的连接
            }else if(results.affectedRows!=1){
                res.send({
                    data:[],
                    msg:"添加失败",
                    state:0
                })
            }
        });
    }
    catch(e) {
        res.send({
            data:[],
            msg:"添加失败",
            state:0
        })
    }
})

router.post('/addBills',function (req,res,next) {
    let userId=req.session.data[0].id;
    let bankName=req.body.bankName;
    let bankId=req.body.bankId;
    let money=req.body.money;

    let sql=`INSERT INTO user_bank_map(userId,money,createDate,defineName,defineId) VALUES ("${userId}","${money}",SYSDATE(),"${bankName}","${bankId}");`
    try{
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;

            if(results.affectedRows==1){
                res.send({
                    data:[],
                    msg:"添加成功",
                    state:1
                })
                // connection.release(); // 释放连接池的连接
            }else if(results.affectedRows!=1){
                res.send({
                    data:[],
                    msg:"添加失败",
                    state:0
                })
            }
        });
    }
    catch(e) {
        res.send({
            data:[],
            msg:"添加失败",
            state:0
        })
    }
})




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