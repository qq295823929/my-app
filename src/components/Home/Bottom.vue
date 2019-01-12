<template>
    <div>
        <div class="desk_nav iconfont" >
            <ul class="nav">
                <router-link class="nav_item" v-for="item in arr" :key="item.id" tag="a" :to="item" active-class="active" exact>
                    <div class="nav_icon iconfont" :class="item.class"></div>
                    <div class="nav_name">{{item.title}}</div>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Bottom",
        data(){
            return {
                arr:[
                    {id:Math.random(),path:"/desk_top",title:"首页",class:"icon-qrcode_fill"},
                    {id:Math.random(),path:"/message",title:"消息",class:"icon-remind_fill"},
                    {id:Math.random(),path:"/work_index",title:"日程",class:"icon-activity_fill"},
                    {id:Math.random(),path:"/userinfo",title:"我的",class:"icon-renxiang"},
                ]
            }
        }
    }
</script>

<style scoped>
    .desk_nav{
        width: 100%;
        overflow: hidden;
        position: fixed;
        bottom: 0;
        border-top: 1px solid #eeeeee;
        background: #ffffff;
    }
    .nav{
        display: flex;
        height: 1rem;
    }
    .nav_item{
        display: flex;
        flex-direction: column;
        font-size: 0.3rem;
        width: 25%;
    }
    .nav_icon{
        height: 0.3rem;
        width: 0.3rem;
    }
    .nav_name{
        padding: 0.2rem 0;
    }

</style>