<template>
    <div class="login">
        <div class="type">
            <div class="registe">注册</div>
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
                if(!/^[a-zA-Z_-]{6,16}$/.test(this.username)){
                    Toast({
                        message: '用户名应该是全,并且长度为6-16个字符',
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
                    url:"/anhao/user/login",
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
                            self.$router.push({name:'Registe',});
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
</style>