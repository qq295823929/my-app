<template>
    <div>
        <h3>我的应用</h3>
        <div class="tool_box">
            <div class="tools">
                <!--<h3>应用列表</h3>-->
                <router-link class="tool" v-for="item in toolList" :key="item.id" tag="a" :to="item.path" exect>
                    <div class="tool_icon iconfont" :class="item.class"></div>
                    <div class="tool_name">{{item.title}}</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ToolList",
        data(){
            return {
                toolList:[
                    {id:Math.random(),path:"/mybill",title:"我的账单",class:"icon-zhangdan"},
                    // {id:Math.random(),path:"/message",title:"消息",class:"icon-remind_fill"},
                    // {id:Math.random(),path:"/work_index",title:"日程",class:"icon-activity_fill"},
                    // {id:Math.random(),path:"/userinfo",title:"我的",class:"icon-renxiang"},
                ]
            }
        },
        method:{

        },
        created(){

        }
    }
</script>

<style scoped>
    .tool_box{
        padding: 0.2rem;
        background: #f9f9f9;
    }
    .tools{
        display: flex;
        flex-wrap: wrap;
        background: #ffffff;
        border-radius: 3px;
        overflow: hidden;
        padding: 0.1rem;

    }
    .tools h3{

    }
    .tool{

        height: 1.5rem;
        width: 25%;
        border: 1px solid #e5e5e5;
        display: flex;
        flex-direction: column;
        text-align: center;
        padding-top: 0.2rem;
        transition: all 0.2s ease;
    }
    .tool:active{
        background: #f9f9f9;
    }
    .tool_icon{
        font-size: 0.5rem;
    }


</style>