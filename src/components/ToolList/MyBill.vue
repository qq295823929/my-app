<template>
    <div class="my_bill">
        11111

    </div>
</template>

<script>
    export default {
        name: "MyBill",
        data(){
            return {


            }
        },
        methods:{
            getMyBill:function () {
                $.ajax({
                    url:"/anhao/bill/getMyBill",
                    type:"get",
                    success:function (res) {
                        console.log(res);
                    }
                })
            }
        },
        created(){
            this.getMyBill();
        }
    }
</script>

<style scoped>

</style>