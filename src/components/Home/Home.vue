<template>
    <div>
        <div class=""></div>
        <Bottom></Bottom>
    </div>
</template>

<script>
    import Bottom from "@/components/Home/Bottom"
    export default {
        name: "Home",
        components: {Bottom},
        created:function () {
                console.log(this.$store.state.isLogin);
        }
    }
</script>

<style scoped>

</style>