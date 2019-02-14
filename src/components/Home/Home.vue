<template>
    <div>
        <Tool></Tool>
        <div @click="talk">11111</div>
    </div>
</template>

<script>
    import Tool from "@/components/ToolList/ToolList"
    import CHAT from '../../client.js'
    export default {
        name: "Home",
        data:function(){
          return {
              CHAT
          }
        },
        components: {
            Tool
        },
        methods:{
            talk:function () {
                this.CHAT.submit({aaa:JSON.stringify(this.$store.state.isLogin)})
            }
        },
        created:function () {
                console.log(this.$store.state.personnalData);
                this.CHAT.init(this.$store.state.personnalData[0].username)





        }
    }
</script>

<style scoped>

</style>