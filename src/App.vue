<template>
    <div id="app">
        <router-view/>
        <Bottom></Bottom>
    </div>
</template>

<script>
    import Bottom from "@/components/Home/Bottom";
    import CHAT from './client.js'

    export default {
        name: 'App',
        data: function () {
            return CHAT
        },
        components: {
            Bottom,
        },
        beforeCreate: function () {
            var win=window

            win.addEventListener("beforeunload", () => {
                CHAT.logout()
                localStorage.setItem("data", JSON.stringify(this.$store.state))
            })
            // var self=this;
            // setTimeout(function () {
            // alert("页面卸载前,state为"+JSON.stringify(self.$store.state))
            // },5000)
//在页面加载时读取localStorage里的状态信息
            // console.log(JSON.stringify(this.$store.state),1);
            var data = localStorage.getItem("data");        //进来的时候获取已经有了的状态信息
            alert("已有的data是:"+data)
            // alert("拿到data"+data)
            if (data) {
                this.$store.dispatch("updataInfo", data)
            }
            // localStorage.getItem("messageStore") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("messageStore"))));
        },
        created:function () {
            console.log(this.$store.state.personnalData);
            if(this.$store.state.personnalData[0].username){
                CHAT.init(this.$store.state.personnalData[0].username)
                CHAT.message(this.$store.state.personnalData[0].username)
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;

    }
</style>
