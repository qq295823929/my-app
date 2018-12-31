<template>
    <div class="register">
        <div class="type">
            <div class="login">已有账号，登陆</div>
        </div>
        <mt-field label="用户名"  placeholder="请输入用户名" @change="checkUsernameIsExist" v-model="username" state="usernameState"></mt-field>
        <mt-field label="密码" placeholder="请输入您的密码" type="password" v-model="password"></mt-field>

        <div class="btn">
            <mt-button  @click="registe" type="primary" size="large">注册</mt-button>

        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import md5 from 'js-md5';
    export default {
        name: 'Registe',
        data() {
            return {
                username: "",
                usernameState:"",       //error,success,warning
                usernameExist:"",           //用户名是否存在；
                password: "",
                passwordState:"",
            }
        },
        methods: {

            registe(){
                var self=this;

                if(!/^[a-zA-Z_-]{6,16}$/.test(this.username)){
                    Toast({
                        message: '用户名应该是全字母,并且长度为6-16个字符',
                        position: 'bottom',
                        duration: 1200
                    });
                    return false
                }
                if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{8,16}$/.test(this.password)){
                    Toast({
                        message: '可以包含数字、字母、下划线，并且要同时含有数字和字母，且长度要在8-16位之间',
                        position: 'bottom',
                        duration: 1200
                    });
                    return false
                }
                alert(self.usernameExist)
                if(!self.usernameExist){
                    Toast({
                        message: '用户名未通过检测',
                        position: 'bottom',
                        duration: 1200
                    });
                    return false
                }

                $.ajax({
                    url:"/anhao/user/userRegiste",
                    type:"post",
                    data:{
                        username:this.username,
                        password:md5(this.password)
                    },
                    success:function (res) {
                        console.log(res);
                        if(res.state==1){
                            this.username=""
                            this.password=""
                            Toast({
                                message: '恭喜您，注册成功现在为你跳转到首页',
                                position: 'bottom',
                                duration: 3000
                            });
                            setTimeout(function () {

                            },1000)
                        }
                    }
                })
            },
            checkUsernameIsExist(){
                var self=this
                $.ajax({
                    url:"/anhao/user/cheackUsernameIsExist",
                    type:"post",
                    data:{
                        username:this.username,
                    },
                    success:function (res) {
                        console.log(res);
                        if(res.length==0){
                            Toast({
                                message: '该账号可以使用',
                                position: 'bottom',
                                duration: 3000
                            });
                            self.usernameExist=true;
                        }else if(res.length>0){
                            Toast({
                                message: '该用户名已被注册',
                                position: 'bottom',
                                duration: 3000
                            });
                            self.usernameExist=false;
                        }
                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .register {
        padding: 0.5rem;
    }
    .type{
        text-align: right;
    }
    .type>div{
        font-size: 0.3rem;
        display: inline-block;
    }

    .btn {
        padding: 1rem 0;
    }
</style>
