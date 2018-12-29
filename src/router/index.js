import Vue from 'vue'
import Router from 'vue-router'
import Registe from '@/components/Registe'
import Home from '@/components/Home'                                            //首页

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', name: 'Home', component: Home},//首页
        {path: '/registe', name: 'Registe', component: Registe},//注册
    ]
})
