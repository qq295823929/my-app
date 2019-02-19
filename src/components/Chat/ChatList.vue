<template>
    <div class="chat">
        <div class="menu_type">
            <div class="menu_item">消息</div>
            <div class="menu_item">通讯录</div>
        </div>
        <ul class="chat_box">
           <router-link tag="a" :to="{name:'ChatDetails',query:{toUser:22}}" class="chat_list">
               <div class="chat_info">
                   <div class="chat_con">
                       <div class="user_name">talk</div>
                       <div class="msg">请点这个聊天</div>
                   </div>
                   <div class="chat_details">
                       <div class="time">14:20</div>
                       <div class="new_count">25</div>
                   </div>
               </div>
           </router-link>
        </ul>

    </div>
</template>

<script>
    export default {
        name: "ChatList",
        data:function () {
            return {

            }
        },
        components:{

        },
        methods:{

        },
        created:function () {







        },

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
        width: 1rem;
        text-align: center;
        line-height: 1rem;
        font-weight: 600;
        font-size: 0.32rem;
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





</style>