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
                this.CHAT.submit({
                    touser:"qq295823929",
                    msg:"你好"
                })
            }
        },
        created:function () {



            console.log(this.$store.state.personnalData);
            this.CHAT.init(this.$store.state.personnalData[0].username)



            CHAT.message()

        }
    }
</script>

<style scoped>

</style>