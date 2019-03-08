<template>
    <div class="chat_details">
        <div class="title_name"><i @click="back">返回</i><span>{{touser}}</span></div>
        <ul class="message_box">

            <li class="message_list" v-for="(item,id) in msgRecord" :class="item.fromuser==$store.state.personnalData.username?'self':''" :key="id">
                <!--{{item}}-->
                <div class="user_img">
                    <img :src="item.photo">
                </div>
                <div class="message_info">
                    <div class="user_name">
                        <span>{{item.fromuser}}</span>
                    </div>
                    <div class="message_con">
                        <p>{{item.msg}}</p>
                    </div>
                </div>
            </li>
        </ul>
        {{CHAT.msg}}
        <div class="input">
            <input id="msg" v-model="msg" @keyup.13="submit" placeholder="输入聊天内容"/>
            <div class="send" @click="submit">发送</div>
        </div>
    </div>
</template>

<script>

    import CHAT from '../../client.js'
    import url from '../../url'
    export default {
        name: "ChatDetails",
        data:function () {
            return {
                CHAT,
                msg:"",
                msgRecord:[],
                touser: '',
            }
        },
        components:{

        },
        methods:{
            back:function(){
              this.$router.go(-1);
            },
            submit:function () {
                var self=this;
                var date=new Date()
                if(this.msg!=""){
                    this.CHAT.submit({
                        fromuser:this.$store.state.personnalData.username,
                        photo:this.$store.state.personnalData.photo,
                        touser: self.touser,
                        msg:self.msg,
                        time:date.getHours()+":"+date.getMinutes()
                    });
                    this.msg=""
                }
            }
        },
        beforeCreate:function () {

        }
        ,
        created:function () {
            // console.log(this.touser);
            var self=this
            this.touser=this.$route.query.toUser;
            this.msgRecord=CHAT.msgData[this.touser]?CHAT.msgData[this.touser].msg:[];
            CHAT.chatingPerson= this.touser;    //让当前正在聊天的人变成这个人,用来判断接收消息的时候,是否给该人发过来的信息加上一条新的消息
            if(CHAT.msgData[this.touser]){
                CHAT.msgData[this.touser].new=0;
                console.log("清零" + this.touser + "的最新聊天信息");
            }
        },
        updated:function(){
            CHAT.scrollToBottom()
        },
        beforeDestroy:function () {
            CHAT.chatingPerson=''
        }
        ,
        watch:{
            CHAT: {
                handler(newName, oldName) {
                    // console.log("新的值是")
                    // console.log( newName )
                    // console.log(",旧的值是")
                    // console.log( oldName);
                    // console.log(this.msgRecord);
                    this.msgRecord=newName.msgData[this.touser]?newName.msgData[this.touser].msg:[];
                    // console.log(this.msgRecord);
                },
                deep: true,
                immediate: true
            }
        }

    }
</script>

<style scoped>
    .title_name{
        position: fixed;
        left: 0;
        top: 0;
        height: 60px;
        line-height: 60px;
        width: 100%;
        background: #0058a4;
        color: #ffffff;
        display: flex;
        justify-content: left;
    }
    .title_name>i{
        margin-right: 0.8rem;
        font-style: normal;
        padding-left: 0.2rem;
    }

    .chat_details{
        height: 100%;
        width: 100%;
        position: relative;
        padding-bottom: 1rem;
    }
    .message_box{
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 1.5rem 0;
    }
    .input{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 1rem;
        padding: 0.1rem 0.2rem;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #aaaaaa;
        background: #f5f5f5;
        width: 100%;
    }
    #msg{
        width: 5.5rem;
        height: 0.7rem;
        line-height: 0.7rem;
        padding: 0 0.2rem;
        border: 1px solid #cccccc;
        font-size: 0.4rem;
        outline: none;
    }
    .send{
        color: #ffffff;
        background: #0086b3;
        border-radius: 3px;
        text-align: center;
        width: 1rem;
        height: 0.7rem;
        line-height: 0.7rem;
    }
    .message_list{
        width: 100%;
        display: flex;
    }
    .message_list.self{
        flex-direction: row-reverse;
    }
    .user_img{
        height: 1rem;
        width: 1rem;
        font-size: 0;
        border-radius: 5px;
        overflow: hidden;
    }
    .user_img>img{
        height: 100%;
        width: 100%;
    }
    .message_info{
        flex-grow: 2;
        /*display: flex;*/
        /*flex-direction: column;*/
        max-width: 80%;
    }
    .user_name{
        font-size: 0.2rem;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
    }
    .user_name>span{
        /*font-size: 0.2rem;*/
        /*padding-left: 0.2rem;*/
    }
    .message_list.self .user_name{
        text-align: right;
    }
    .message_con{
        overflow: hidden;
    }
    .message_list.self .message_con>p{
        float: right;
        background: #adffa3;
    }
    .message_con>p{
        float: left;
        border: 1px solid #e5e5e5;
        margin: 0.1rem 0.2rem;
        padding: 0.15rem;

        font-size: 0.3rem;
        border-radius: 5px;
    }








</style>