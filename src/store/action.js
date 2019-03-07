var actions={
    login({commit},num){
        commit("tologin",num);
    },
    getPersonnalData({commit},obj){
        commit("savePersonnalData",obj)
        // alert(JSON.stringify(obj)+"shoudao dengluyemian ")
    },
    updataInfo({commit},obj){
        commit("updataInfo",obj)
    }
}


export default actions