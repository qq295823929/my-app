#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('demo:server');
var http = require('http');

var querystring = require("querystring");
var port = 80;


var mysql = require('mysql');
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || port);
app.set('port', port);

/**
 * Create HTTP server.
 */

var onlineUsers = {} //在线用户
var onlineCount = 0  //在线用户人数
var lock = {}
var user = ''


var server = http.createServer(app);
var io = require('socket.io')(server);


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'Userinfo',
    multipleStatements: true
});

connection.connect();


io.on('connection', function (socket) {
    var toUser = {}
    var fromUser = {}
    var msg = ''
    socket.emit('open')
    socket.on('addUser', function (username) {
        console.log(username + "连接进来了");
        // if (!onlineUsers.hasOwnProperty(username)) {
            onlineUsers[username] = socket;
            onlineCount = onlineCount + 1
        // }
        for (key in onlineUsers) {
            getOnlinePerson(key);
            // console.log(onlineUsers);
        }






        // onlineUsers[username].emit("getPersonLists",lists)
        user = username;
        // console.log(onlineUsers[username].id) //建立连接后 用户点击不同通讯录都是建立同样的socket对象
        console.log('在线人数：', onlineCount)
        socket.on('sendMsg', function (obj) {
            if(onlineUsers[obj.touser]){           //如果被发送的人在线的话,就直接将信息发给他;
                console.log(obj);
                onlineUsers[obj.touser].emit('to' + obj.touser, obj)
            }else {             //如果被发送的人不在线,那就要将这条消息作为未读消息,存在数据库;
                console.log(11111);
            }
            // console.log(onlineUsers);
            // toUser = obj.toUser
            // fromUser = obj.fromUser
            // msg = obj.msg
            // time = obj.time
            // if (toUser == '群聊') {
            //     for (user in onlineUsers) {
            //         obj.fromUser = '群聊'
            //         obj.toUser = user
            //         obj.trueFrom = fromUser
            //         if( user != fromUser ) { //接收方
            //             onlineUsers[user].emit('to' + user, obj)
            //         } else { //发送方
            //             obj.toUser = '群聊'
            //             obj.fromUser = user
            //             onlineUsers[fromUser].emit('to' + fromUser, obj)
            //         }
            //     }
            // }
            // else if(toUser in onlineUsers) {
            //     console.log(1)
            //     onlineUsers[toUser].emit('to' + toUser, obj)
            //     onlineUsers[fromUser].emit('to' + fromUser, obj)
            // } else {
            //     console.log(toUser + '不在线')
            //     // console.log('socket.id', socket.id)
            //     onlineUsers[fromUser].emit('to' + fromUser, obj)
            // }
        })

        // console.log(onlineUsers);
        socket.on("disconnect", function (username) {
            console.log(user + "------客户端断开连接.")
            onlineCount-=1;
            //遇到的坑 每次都要删除该socket连接 否则断开重连还是这个socket但是client端socket已经改变
            delete onlineUsers[username]
        })
    })


})



// 404处理
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 错误处理
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});




/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function getOnlinePerson(username) {
    let lists = [];

    let str=''

    for (key in onlineUsers) {
        str+='"'+key+'"'+','
    }
    str=str.substr(0,str.length-1);
    let sql = `SELECT username,id ,photo,sign,nickname,realname FROM user WHERE username in (${str})`;
    connection.query(sql, function (error, results, fields) {
        console.log(results);
        if (error) throw error;
        onlineUsers[username].emit("getPersonLists",results)

        console.log("给" + username + "发在线人数");
    });



}
