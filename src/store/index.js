import Vue from "vue";
import Vuex from "vuex";
import state from "./state"
Vue.use(Vuex);

export default new Vuex.Store({
    strict:true,
    state,
    mutations:{
        tologin(state,num){
            state.isLogin = num;
        },
        savePersonnalData(state,obj){
            state.personnalData=obj
            console.log(state.personnalData);////
        }
    },
    actions:{
        login({commit},num){
            commit("tologin",num);
        },
        getPersonnalData({commit},obj){
            commit("savePersonnalData",obj)
        }
    },
    getters:{},
    modules:{}
})
