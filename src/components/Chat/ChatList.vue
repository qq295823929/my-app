<template>
    <div class="chat">
        <div class="menu_type">
            <div class="menu_item" @click="changeType" :class="type==true?'active':''">消息</div>
            <div class="menu_item" @click="changeType" :class="type==false?'active':''">在线</div>
        </div>
        <ul class="chat_box" v-show="type==true">
           <router-link tag="a" v-for="(item,id) in recordList" :to="{name:'ChatDetails',query:{toUser:item.fromuser}}" :key="id" class="chat_list">
               <div class="chat_info">
                   <div class="chat_con">
                       <div class="user_name">{{item.fromuser}}</div>
                       <div class="msg">{{item.msg[item.msg.length-1].msg}}</div>
                   </div>
                   <div class="chat_details">
                       <div class="time">{{item.msg[item.msg.length-1].time}}</div>
                       <div class="new_count" v-show="item.new>0">{{item.new}}</div>
                   </div>
               </div>
           </router-link>
        </ul>
        <ul class="person_lists" v-show="type==false">
            <router-link tag="a"   v-for="(item,id) in CHAT.personList" :key="id" :to="{name:'ChatDetails',query:{toUser:item.username}}" v-if="item.username!=$store.state.personnalData.username" class="person_list">
                <div class="person_img">
                    <img :src="item.photo"/>
                </div>
                <div class="person_info">
                    <div class="person_con">
                        <div class="user_name">{{item.username}}</div>
                        <div class="user_sign"></div>
                    </div>
                    <!--<div class="chat_details">-->
                        <!--<div class="time">14:20</div>-->
                        <!--<div class="new_count">25</div>-->
                    <!--</div>-->
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
    import CHAT from '../../client.js'
    export default {
        name: "ChatList",
        data:function () {
            return{
                CHAT,
                msg:"",
                touser: '群聊',
                type:true,
                recordList:[]
            }
        },
        components:{

        },
        methods:{
            changeType:function () {
                this.type=!this.type;
            }

        },
        created:function () {

            CHAT.scrollToBottom();




        },
        mounted:function () {
            var self=this
            // setTimeout(function () {
            //     console.log(CHAT);
            // },3000)
        },
        watch:{
            CHAT: {
                handler(newName, oldName) {
                    // console.log(newName.msgData);
                    var list=[];
                    for(var key in newName.msgData){
                        console.log(newName.msgData);
                        list.push(newName.msgData[key])
                    }
                    this.recordList=list;
                    // console.log("聊天记录变化啦");
                    // console.log(list);

                    // this.recordList=newName.msgData[this.touser]?newName.msgData[this.touser].msg:[];
                },
                deep: true,
                immediate: true
            }
        }

    }
</script>

<style scoped>
    .chat{
        width: 100%;
        height: 100%;
        position: relative;
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    .menu_type{
        height: 1rem;
        display: flex;
        justify-content: center;
        border-bottom: 1px solid #e0e5bf;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
    .menu_type .menu_item{
        width: 1.2rem;
        text-align: center;
        line-height: 1rem;
        font-weight: 600;
        font-size: 0.32rem;
        transition: all 0.2s ease;
    }
    .menu_item.active{
        color: #26a2ff;
    }
    .chat_box{
        height: 100%;
        overflow-y:scroll ;
        overflow-x: hidden;
    }
    .chat_list{
        display: flex;
        height: 1.5rem;

    }
    .chat_info{
        flex-grow: 1;
        display: flex;
        padding: 0.2rem 0.1rem;
        border-bottom: 1px solid #e5e5e5;
        height: 100%;
    }
    .chat_con{
        display: flex;
        flex-direction: column;
        padding-right: 0.1rem;
        flex-grow: 1;
    }
    .user_name{
        font-size: 0.3rem;
    }
    .msg{
        font-size: 0.24rem;
        color: #cccccc;
        line-height: 0.6rem;
    }
    .chat_con>div{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .chat_details{
        display: flex;
        flex-direction: column;
        padding-right: 0.1rem;
    }
    .chat_details{
        display: flex;
        /* flex-direction: column; */
        flex-wrap: wrap;
        align-items: center;
    }
    .new_count{
        height: 0.42rem;
        line-height: 0.42rem;
        color: #ffffff;
        background: #cd412d;
        font-size: 0.25rem;
        border-radius: 0.25rem;
        width: 0.42rem;
        text-align: center;
    }

    .person_list{
        display: flex;
        padding: 0.2rem;
        border-bottom: 1px solid #e5e5e5;
        transition: all 0.2s ease;
    }
    .person_list:active{
        background: #f5f5f5;
    }
    .person_img{
        height: 1rem;
        width: 1rem;
        font-size: 0;
        overflow: hidden;
        border-radius: 5px;

    }
    .person_img>img{
        height: 100%;
        width: 100%;
    }
    .person_info{
        padding:0 0.2rem;
        flex-grow: 2;
    }







</style>