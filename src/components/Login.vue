<template>
    <div class="login">
        <div class="type">
            <router-link class="registe" target="div" :to="{ name: 'Registe'}">注册</router-link>
        </div>
        <mt-field label="用户名"  placeholder="请输入用户名"  v-model="username" state="usernameState"></mt-field>
        <mt-field label="密码" placeholder="请输入您的密码" type="password" v-model="password"></mt-field>

        <div class="btn">
            <mt-button  @click="login" type="primary" size="large">立即登录</mt-button>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import md5 from 'js-md5';
    import url from '../url'
    export default {
        name: "Login",
        data(){
            return {
                username: "",
                password: "",
            }
        },
        methods:{
            login(){
                var self=this;
                if(!/^[a-zA-Z_0-9]{6,16}$/.test(this.username)){
                    Toast({
                        message: '用户名由英文开头,并且长度为6-16个字符',
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
                $.ajax({
                    url:url+"/user/login",
                    type:"post",
                    data:{
                        username:this.username,
                        password:md5(this.password)
                    },
                    success:function (res) {
                        if(res.state===1){
                            Toast({
                                message: '登陆成功',
                                position: 'bottom',
                                duration: 1200
                            });
                            //获取用户信息;
                            $.ajax({
                                url:url+"/user/userinfo",
                                type:"get",
                                success:function (res) {
                                    console.log(res);
                                    self.$store.dispatch("getPersonnalData",res.data);
                                    self.$store.dispatch("login",true);

                                    self.$router.push({name:'Home',});
                                }
                            })

                        }else {
                            Toast({
                                message: '账号或密码错误',
                                position: 'bottom',
                                duration: 1200
                            });
                            self.password="";
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .login {
    padding: 0.5rem;
    }
    .type{
        text-align: right;
    }
    .registe{
        display: inline-block;
        font-size: 0.28rem;
    }
    .btn {
        padding: 1rem 0;
    }
</style>