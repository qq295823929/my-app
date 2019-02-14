var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var querystring = require('querystring');
let fs = require('fs');
var mysql      = require('mysql');
var routes = require('./routes/route_app');
var app = express();
var session = require('express-session');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'Userinfo'
});

connection.connect();



var sessionOpts = {
    // 设置密钥
    secret: 'a cool secret',
    // Forces the session to be saved back to the session store
    resave: true,
    // Forces a session that is "uninitialized" to be saved to the store.
    saveUninitialized: true,
    // 设置会话cookie名, 默认是connect.sid
    key: 'myapp_sid',
    // If secure is set to true, and you access your site over HTTP, the cookie will not be set.
    cookie:  {maxAge: 60 * 1000 * 60}
}

app.use(session(sessionOpts))


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.engine('.html', ejs.__express);
app.set('view engine', 'html');// app.set('view engine', 'ejs');
// app.use(favicon(path.join(__dirname, 'favicon', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));







app.use('/user',require('./routes/user/user.js'));
app.use('/bill',require('./routes/bill/bill'));
app.use('/chat',require('./routes/chat/chat'));








//处理webpack服务请求
app.get('/__webpack_hmr', function(req, res) {
    res.send('')
})
app.get('/', (req, res) => {
    connection.query("select * from `user` where password='123456'", function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });




    // res.send('app');
});





// app.get('/app', routes.index);
// app.get(/\/movie\/hot\//, routes.hot);
// app.get(/\/movie\/cinema\//, routes.cinema);
// app.get(/\/movie\/info\//, routes.info);
// app.get(/\/movie\/evaluation\//, routes.evaluation);
// app.get(/\/movie\/coming\//, routes.coming);
// app.get(/\/movie\/coming\/[\w\W]*/, routes.comingLimit);
//
// app.get('/movie/swiper', routes.swiper);
// app.get('/movie/city', routes.city);
// app.get('/movie/cinema_detail', routes.cinema_detail);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
