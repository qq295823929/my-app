<template>
    <div class="my_bill">
        <div class="box_title">
            <h3>我的账单</h3> <div class="new_bank" @click="addNewBank">新</div>
        </div>
        <div class="bill_lists">
            <div v-for="(item,id) in bill" :key="id" @click="addNewBill(item.difineId,item.name)" class="bill_list">
                <div class="bill_title">
                    <h3>{{item.name}}</h3>
                    <div class="new">+</div>
                </div>
                <div class="bill_info">
                    <div class="now_count">
                        <span>余额:</span><span class="money_count">{{item.total}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default {
        name: "MyBill",
        data(){
            return {
                bill:[],
                newBankFlag:false   //控制新添加银行的窗口的显示隐藏

            }
        },
        methods:{
            getMyBill:function () {
                var self=this;
                $.ajax({
                    url:"/anhao/bill/getMyBill",
                    type:"get",
                    success:function (res) {
                        console.log(res);
                        self.bill=res.data;
                    }
                })
            },
            addNewBill:function (id,name) {
                var self=this;
                MessageBox.prompt('请输入您想要添加的金额').then(({ value, action }) => {
                    // alert(value)
                    $.ajax({
                        url:'/anhao/bill/addBills',
                        type:'post',
                        data:{
                            bankName:name,
                            bankId:id,
                            money:value
                        },
                        success:function (res) {
                            console.log(res);
                            Toast({
                                message: '已为您成功记账',
                                position: 'bottom',
                                duration: 1200
                            });
                            self.getMyBill();
                        }

                    })
                });
            },
            addNewBank:function () {
                var self=this;
                MessageBox.prompt('请输入一个您的资金存放地').then(({ value, action }) => {
                    // alert(value)
                    $.ajax({
                        url:'/anhao/bill/addBank',
                        type:'post',
                        data:{
                            bankName:value
                        },
                        success:function (res) {
                            console.log(res);
                            Toast({
                                message: '添加存储地成功,您现在可以新增记账了',
                                position: 'bottom',
                                duration: 1200
                            });
                            self.getMyBill();
                        }

                    })

                });
            }

        },
        created(){
            this.getMyBill();
        }
    }
</script>

<style scoped>
    .my_bill{

    }
    .box_title{
        display: flex;
        justify-content: space-between;
    }
    .new_bank{
        height: 0.5rem;
        width: 0.5rem;
        transition: all 0.2s ease;
        background: #f2f2f2;
        border-radius: 50%;
        text-align: center;
        line-height: 0.5rem;
        margin-right: 0.3rem;
        margin-top: 0.2rem;
    }
    .new_bank:active{
        background: #e5e5e5;
        transform: scale(0.95);
    }
    .box_title>h3{
        padding: 0.2rem 0.1rem;
        font-size: 0.3rem;
    }
    .bill_lists{
        padding: 0 0.2rem;
    }
    .bill_list{
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 0.01rem;
    }
    .bill_title{
        display: flex;
        justify-content: space-between;
        line-height: 0.24rem;
        padding: 0.2rem  0.3rem;
    }
    .bill_title h3{
        font-weight: 600;
        font-size: 0.2rem;
        line-height: 0.48rem;
    }
    .new{
        width: 0.48rem;
        height: 0.48rem;
        text-align: center;
        line-height: 0.48rem;
        transition: all 0.2s ease;
        border-radius: 3px;
        font-size: 0.3rem;
    }
    .new:active{
        background: #e5e5e5;
    }
    .bill_info{
        display: flex;
        justify-content: space-between;
        padding: 0.4rem  0.3rem;
        background: #d4e1ea;
        border-radius: 5px;
    }

    .new_bank_name{
        display: flex;
        justify-content: space-around;
    }
</style>