<template>
    <div class="chat_details">
        <ul class="message_box">
            <li class="message_list" v-for="(item,id) in CHAT.msgArr" :key="id">
                <span>{{item.fromuser}}</span>
                <p>{{item.msg}}</p>
            </li>
        </ul>

        <div class="input">
            <input id="msg" v-model="msg" @keyup.13="submit"/>
            <div class="send" @click="submit">发送</div>
        </div>
    </div>
</template>

<script>

    import CHAT from '../../client.js'
    export default {
        name: "ChatDetails",
        data:function () {
            return {
                CHAT,
                msg:"111",
                touser: '群聊',
                // msgArr: []



            }
        },
        components:{

        },
        methods:{
            submit:function () {
                var date=new Date()
                if(this.msg!=""){
                    this.CHAT.submit({
                        fromuser:this.$store.state.personnalData[0].username,
                        touser: "群聊",
                        msg:this.msg,
                        time:date.getHours()+":"+date.getMinutes()
                    })

                    this.msg=""
                }
            }
        },
        created:function () {

            // this.touser=this.$route.query.id;




        }

    }
</script>

<style scoped>
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
    }
    .message_list p{
        border: 1px solid #e5e5e5;
        margin: 0.1rem 0.2rem;
        padding: 0.1rem;
        background: #adffa3;
    }








</style>