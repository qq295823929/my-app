<template>
    <div class="register">
        <mt-field label="用户名"  placeholder="请输入用户名" v-model="username" state="usernameState"></mt-field>
        <mt-field label="密码" placeholder="请输入您的密码" type="password" v-model="password"></mt-field>

        <div class="btn">
            <mt-button @click="registe" type="primary" size="large">注册</mt-button>
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
                password: "",
                passwordState:"",

            }
        },
        methods: {
            registe(){
                if(!/^[a-zA-Z_-]{6,16}$/.test(this.username)){
                    Toast({
                        message: '用户名应该是以字母,并且长度为6-16个字符',
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
                    url:"/anhao/user/userRegiste",
                    type:"post",
                    data:{
                        username:this.username,
                        password:md5(this.password)
                    },
                    success:function (res) {
                        console.log(res);
                    }
                })
            },


            first_link() {
                $.ajax({
                    url: "/anhao/user/userRegiste",
                    data: {
                        password: "password",
                        username: "username"
                    },
                    type: "post",
                    success: function (res) {
                        console.log(res);
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

    .btn {
        padding: 1rem 0;
    }
</style>
