import io from 'socket.io-client'
import settings from './setting'
import url from './url'

const CHAT = {
    // msgObj: document.getElementsByClassName("body-wrapper")[0],
    username: null,
    socket: null,
    msgArr: [],
    msgData:{

    },
    chatingPerson:"",//当前正在聊天的人
    personList:[],
    //让浏览器滚动条保持在最低部
    scrollToBottom: function () {
        // alert(1)
        window.scrollTo(0, 900000);

    },
    //退出，本例只是一个简单的刷新
    logout: function (username) {
        this.socket.disconnect(username);
        // location.reload();
    },
    //提交聊天消息内容
    submit: function (obj) {
        // if(CHAT.msgData[obj]){
        //     alert(1)
        // }
        this.socket.emit('sendMsg', obj);
        console.log(CHAT.msgData);
        if(!CHAT.msgData[obj.touser]){       //如果和这个人有过聊天记录
            CHAT.msgData[obj.touser]={
                fromuser:obj.touser,
                msg:[obj],
                new:0,
            };
        }else {     //如果和这个人没有聊天记录
            console.log("给" + obj.touser + "加一条消息,但这条消息是我自己发的");
            CHAT.msgData[obj.touser].msg.push(obj)
        }
    },
    message: function (username) {
        var self=this
        // console.log('message')
        this.socket.on('to' + username, function (obj) {
            // console.log(JSON.stringify(obj))
            obj.photo = obj.photo == null ? ("/photo/default.jpg") : (obj.photo)
            console.log(obj);
            var formUser=obj.fromuser;
            if(!CHAT.msgData[formUser]){     //如果还没有和这个人的聊天记录,那就要创建一个和这个人的聊天记录;
                CHAT.msgData[formUser]={
                    fromuser:formUser,
                    msg:[obj],
                    new:0,
                };
                console.log("创建一个新的人的消息");
                // alert(1)
            }else {
                console.log("给" + formUser + "加一条消息");
                CHAT.msgData[formUser].msg.push(obj)
            }
            console.log("正在聊天的人是" + CHAT.chatingPerson + "这条消息是从" + formUser + "来的");
            if(CHAT.chatingPerson!=formUser){
                CHAT.msgData[formUser].new+=1;
            }else{
                // console.log(CHAT.chatingPerson);
                // console.log(formUser)
            }
            // console.log(self.$router);
            console.log(CHAT.msgData);
            // console.log(obj);
            // CHAT.msgArr.push(obj)
            // console.log(CHAT.msgData);
            CHAT.scrollToBottom()
        });
        this.socket.on('getPersonLists', function (obj) {
                CHAT.personList=obj;
                console.log(CHAT.personList);
        })

    },
    init: function (username) {
        // alert("調用了init"+username)
        //连接websocket后端服务器
        this.socket = io.connect(settings.socket, {'force new connection': true})
        this.socket.on('open', function () {
            console.log('已连接')
        })
        this.socket.emit('addUser', username)
        // alert(username)
        // alert(this.socket.emit);
    }
}
export default CHAT
