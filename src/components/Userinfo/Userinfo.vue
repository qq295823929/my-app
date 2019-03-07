<template>
    <div class="user_info box">

        <cropper v-on:getImg="getChildImg"  @getHeaderImage="newHeaderImage"></cropper>
        <div class="box1">
            <div class="my_photo">
                <span class="trans">头像</span>
                <div class="photo"><img :src="userInfo.photo" id="my_photo"></div>
                <input class="js_upFile" type="file" name="cover" accept="image/*" capture="camera" multiple style="display: none"/>
            </div>
            <div class="my_name my_info">
                <span class="trans">姓名</span>
                <div id="my_name">{{userInfo.photo}}</div>
            </div>
        </div>
        <div class="box2">
            <div class="my_id my_info">
                <span class="trans"  @click="update">身份证号</span>
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
    import cropper from "@/components/Userinfo/cropper"
    import url from '../../url'
    import { Toast } from 'mint-ui';
    export default {
        name: "User_info",
        data(){
            return {
                userInfo:{
                    phpto:""
                },
                avatar: '',
                file: '',
                headerImage:'',
                newHeaderImage:''
            }
        },
        components: {
            cropper,
        },
        methods:{
            getChildImg:function (img) {
                var self=this;
                // console.log(img);
                var arr = img.split(',');
                var mime = arr[0].match(/:(.*?);/)[1];
                var bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                let file=new File([u8arr], self.userInfo.username, {type:mime});
                let data = new FormData()
                data.append('img', file)
                $.ajax({
                    url : url+"/user/uploads",
                    data : data,
                    type : "POST",
                    datatype : "json",
                    cache : false,// 上传文件无需缓存
                    processData : false,// 用于对data参数进行序列化处理 这里必须false
                    contentType : false, // 必须
                    success : function(res) {
                        console.log(res);
                        if(res.state==1){
                            Toast({
                                message: '上传头像成功',
                                position: 'bottom',
                                duration: 1200
                            });
                            self.findPersonalData()
                        }
                    }
                })
            }
            ,
            changeImage(e){
                let self=this;
                let file = e.target.files[0];
                if(file) {
                    this.file = file
                    console.log(this.file)
                    let reader = new FileReader()
                    let that = this
                    reader.readAsDataURL(file)
                    reader.onload= function(e){
                        // 这里的this 指向reader
                        that.avatar = this.result

                    }
                }


            },
            findPersonalData(){
                var self=this
                // this.$http.post(url,).then(res=>{
                //     var personnalData=res.data
                //     personnalData.USER_IMG="http://www.hheducloud.gov.cn"+personnalData.USER_IMG
                //     self.$store.dispatch('getPersonnalData',personnalData)
                //     self.$store.state.personnalData
                // });
                $.ajax({
                    url:url+"/user/userinfo",
                    type:"get",
                    success:function (res) {
                        var data=res.data;
                        data.photo=data.photo==null?("/photo/default.jpg"):(data.photo)
                        self.userInfo=data;
                        console.log(self.userInfo);
                        self.$store.dispatch("getPersonnalData",res.data);
                        self.$store.dispatch("login",true);


                    }
                })
            },
            update(){
                console.log(this.$store.state.personnalData.photo);
            }
        }
        ,
        mounted(){
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
