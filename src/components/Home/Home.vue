<template>
    <div>
        <Tool></Tool>

    </div>
</template>

<script>
    import Tool from "@/components/ToolList/ToolList"
    export default {
        name: "Home",
        components: {
            Tool
        },
        created:function () {
                console.log(this.$store.state.isLogin);
        }
    }
</script>

<style scoped>

</style>