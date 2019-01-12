var actions={
    login({commit},num){
        commit("tologin",num);
    },
    getPersonnalData({commit},obj){
        commit("savePersonnalData",obj)
    }
}


export default actions