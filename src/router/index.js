import Vue from 'vue'
import Router from 'vue-router'
import Registe from '@/components/Registe'
import Home from '@/components/Home/Home'                                            //首页
import Login from '@/components/Login'
import Userinfo from "../components/Userinfo/Userinfo";       //登陆
import MyBill from "@/components/ToolList/MyBill"              //我的账单
import MyBillDetail from "@/components/ToolList/MyBillDetail"   //账单的详情
import store from '@/store/index'
Vue.use(Router)





 const router=new Router({
    mode: 'history',
    routes: [
        {path: '/', name: 'Home', component: Home,meta: { navShow: true, cname: '一级页面' }},//首页
        {path: '/registe', name: 'Registe', component: Registe},//注册
        {path:'/login',name:'Login',component:Login},//登陆
        {path:'/userinfo',name:'Userinfo',component:Userinfo,meta: { navShow: true, cname: '一级页面' }},//个人信息；
        {path:'/mybill',name:'MyBill',component:MyBill},      //我的账单
        {path:'/mybilldetail',name:'MyBillDetail',component:MyBillDetail},//账单的详情;
    ]
})
router.beforeEach((to, from, next) => {

    var data=localStorage.getItem("data");        //进来的时候获取已经有了的状态信息
    // alert("拿到data"+data)
    if(data){
        store.dispatch("updataInfo",data)
    }


    const nextRoute = ['MyBill','MyBillDetail','Home'];
    // alert(JSON.stringify(store.state))

    let isLogin = store.state.isLogin;// 是否登录
    console.log("我要去:"+to.name);
    // console.log(isLogin)
    // 未登录状态；当路由到nextRoute指定页时，跳转至login
    if (nextRoute.indexOf(to.name) >= 0) {
        // alert(isLogin)
        if (!isLogin) {
            console.log('还没有登陆');
            router.push({ name: 'Login' })
        }
    }
    // 已登录状态；当路由到login时，跳转至home
    if (to.name === 'Login') {
        if (isLogin) {
            router.push({ name: 'Home' });
        }
    }
    next();
});



export default router;