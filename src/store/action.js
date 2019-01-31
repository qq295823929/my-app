var actions={
    login({commit},num){
        commit("tologin",num);
    },
    getPersonnalData({commit},obj){
        commit("savePersonnalData",obj)
    },
    updataInfo({commit},obj){
        commit("updataInfo",obj)
    }
}


export default actions