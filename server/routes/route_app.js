

var user=require('./user/user');            //引用user接口;

let url = require('url');

function sendDataFn(req, res, filename, needcity) {
    // let query = url.parse(req.url, true).query,
    //     name = query.name || '',
    //     city = query.city,
    //     readFileName = '',
    //     sendData = {
    //         errno: 0,
    //         city: city,
    //         msg: 'ok',
    //         data: {}
    //     };
    // if (needcity) {
    //     readFileName = city + filename;
    // } else {
    //     readFileName = filename;
    // }
    // dealFn.readFileData(name + readFileName).then((data) => {
    //     sendData.data = data;
    //     res.send(sendData);
    // }, (msg) => {
    //     sendData.errno = -1;
    //     sendData.msg = '暂时没有数据';
    //     res.send(sendData);
    // })
    res.send("11111")
}


exports.user=user.user;

exports.coming = (req, res, next) => {
    let query = url.parse(req.url, true).query,
        limit = query.limit,
        offset = query.offset;
    if (limit && offset) {
        next();
    } else {
        sendDataFn(req, res, 'coming.json', false);
    }
}




