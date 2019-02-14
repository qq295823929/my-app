// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./assets/rem"
import "./assets/common.css"
import Axios from 'axios';
import VueAxios from "vue-axios"
import store from './store/index.js';
import VueCookies from 'vue-cookies';
import VueSocketio from 'vue-socket.io';
// import socketio from 'socket.io-client';


import './assets/icon/iconfont.css'


// console.log(socketio('anhao/'));
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);
Vue.use(VueSocketio,('http://127.0.0.1/'),store);


Vue.use(VueCookies)
Vue.use(VueAxios,Axios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
