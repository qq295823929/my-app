<template>
    <div>
        <div class="desk_nav iconfont"  v-show="$route.meta.navShow">
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
                    {id:Math.random(),path:"/",title:"首页",class:"icon-shouye"},
                    {id:Math.random(),path:"/message",title:"消息",class:"icon-news"},
                    {id:Math.random(),path:"/work_index",title:"更多",class:"icon-gengduo"},
                    {id:Math.random(),path:"/userinfo",title:"我的",class:"icon-wode"},
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
        height: 1.3rem;
    }
    .nav_item{
        display: flex;
        flex-direction: column;
        font-size: 0.3rem;
        width: 25%;
        /*justify-content: center;*/
        padding-top: 0.4rem;
        border-left:1px solid #e5e5e5;

    }
    .nav_icon{
        /*height: 0.3rem;*/
        /*width: 0.3rem;*/
        font-size: 0.35rem;
        justify-content: center;
        display: flex;
    }
    .nav_name{
        padding: 0.1rem 0;
        text-align: center;
    }
    .active{
        color: #0086b3;
        font-weight: 600;
    }

</style>