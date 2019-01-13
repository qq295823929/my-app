<template>
    <div class="user_info box">
        <div class="box1">
            <div class="my_photo">
                <span class="trans">头像</span>
                <div class="photo"><img :src="this.$store.state.personnalData.USER_IMG" id="my_photo"></div>
                <input class="js_upFile" type="file" name="cover" accept="image/*" capture="camera" multiple style="display: none"/>
            </div>
            <div class="my_name my_info">
                <span class="trans">姓名</span>
                <div id="my_name">{{this.$store.state.personnalData.USER_NAME}}</div>
            </div>
        </div>
        <div class="box2">
            <div class="my_id my_info">
                <span class="trans">身份证号</span>
                <div id="my_id">{{this.$store.state.personnalData.USER_SID}}</div>
            </div>
            <div class="my_from my_info" style="border: none">
                <span class="trans">籍贯</span>
                <div id="my_from">{{this.$store.state.personnalData.NATIVE_PLACE}}</div>
            </div>
        </div>
        <div class="box3">
            <div class="my_num my_info">
                <span class="trans">联系电话</span>
                <div id="my_num">{{this.$store.state.personnalData.USER_MOBILE}}</div>
            </div>
            <div class="my_address my_info" style="border: none">
                <span class="trans">联系地址</span>
                <div id="my_address">{{this.$store.state.personnalData.REGION_NAME}}</div>
            </div>
        </div>
        <div class="sign_info my_info">
            <span class="trans">个性签名</span>
            <div id="sign_info" style="text-indent: 2em;">{{this.$store.state.personnalData.SIGN_INFO}}</div>
        </div>
        <div class="box4">返回</div>
    </div>
</template>
<script>
    export default {
        name: "User_info",
        data(){
            return {

            }
        },
        methods:{
            findPersonalData(){
                var self=this
                var url="/anhao/user/userinfo";
                // this.$http.post(url,).then(res=>{
                //     var personnalData=res.data
                //     personnalData.USER_IMG="http://www.hheducloud.gov.cn"+personnalData.USER_IMG
                //     self.$store.dispatch('getPersonnalData',personnalData)
                //     self.$store.state.personnalData
                // });
                $.ajax({
                    url:url,
                    type:"get",
                    success:function (res) {
                        console.log(res);
                    }
                })
            }
        }
        ,
        created(){
            this.findPersonalData();
        }
    }
</script>

<style scoped>
    .box{
        width: 100%;
        height: 100%;
        background: #eeeeee;
    }
    .box>div{
        padding-left: 0.2rem;
        background: #ffffff;
    }
    .box1>div,.box2>div,.box3>div{
        width: 100%;
        border-bottom: 1px solid #cccccc;
        padding: 0.25rem 0rem 0.25rem 0.2rem;
        background: #ffffff;
        overflow:hidden;
    }
    .trans{
        font-size: 0.3rem;
        float: left;
    }
    .box>div>div>div{
        float: right;
        margin-right: 0.2rem;
        font-size: 0.3rem;
    }
    .photo{
        border: 1px solid #cccccc;
    }
    .my_photo{
        line-height: 1.8rem;
    }
    .photo{
        height: 1.8rem;
        width: 1.8rem;
    }
    .photo>img{
        width: 100%;
        height: 100%;
        float: left;
    }
    .box1{
        margin-bottom: 0.2rem;
    }
    .box2{
        margin-bottom: 0.2rem;
    }
    .box3{
        margin-bottom: 0.2rem;
    }
    .box4{
        text-align: center;
        font-size: 0.4rem;
        line-height: 0.8rem;
    }
    .sign_info{
        margin-bottom: 0.2rem;
        overflow: hidden;
    }
    .sign_info .trans{
        float: none;
        line-height: 1rem;
    }
    #sign_info{
        font-size: 0.3rem;
        margin-right: 0.2rem;
        height: 2rem;
        width: 100%;
    }
</style>
