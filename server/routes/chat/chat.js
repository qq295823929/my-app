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

// connection.connect();




module.exports = router;