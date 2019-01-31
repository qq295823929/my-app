<template>
    <div class="bill_details">
        <h3>账单详情</h3>
        <div class="define_name" v-if="lists.length>0">{{lists[0].defineName}}</div>
        <ul v-if="lists.length>0" class="detail_lists">
            <li v-for="item in lists" :key="item.id">
                <div>
                    <span style="width: 0.3rem">{{lists.indexOf(item)+1}}、</span>
                    <span style="width: 2rem">金额:{{item.money}}</span>
                    <span class="time">编辑时间:{{item.createDate}}</span>
                </div>
            </li>
        </ul>
        <div class="no_data" v-if="lists.length<1">对不起,您暂时还没有记账,返回列表添加记账吧</div>
    </div>
</template>

<script>
    export default {
        name: "MyBillDetail",
        data(){
            return {
                defineId:'',
                lists:[]
            }
        },
        methods:{
            getMyBillDetail(){
                this.defineId=this.$route.query.id;
                let self=this;
                if(this.defineId==''){
                    alert(1)
                }else {
                    $.ajax({
                        url:"/anhao/bill/getMyBillDetailById",
                        type:"post",
                        data:{
                            id:self.defineId
                        },
                        success:function (res) {
                            console.log(res);
                            self.lists=res.data;
                        }
                    })
                }
            }
        },
        created(){
            // alert(1)
            // alert(1)
            this.getMyBillDetail()
            // alert()
        }
    }
</script>

<style scoped>

    .bill_details{

    }
    .bill_details h3{
        font-size: 0.4rem;
        line-height: 0.5rem;
    }
    .define_name{
        font-size: 0.4rem;
        margin-top: 0.4rem;
    }
    .detail_lists{
        padding: 0.2rem 0.2rem;
    }
    .time{
        font-size: 0.24rem;
        color: #cccccc;
    }
    .detail_lists li div{
        border-bottom: 1px solid #e5e5e5;
        padding: 0.1rem 0 ;
        display: flex;
        justify-content: space-between;
    }
    .no_data{
        height: 0.5rem;
        line-height: 0.5rem;
        color: #cccccc;
    }

</style>