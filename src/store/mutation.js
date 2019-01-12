var mutations={
    tologin(state,num){
        state.isLogin = num;
    },
    savePersonnalData(state,obj){
        state.personnalData=obj
        console.log(state.personnalData);////
    }
}

export default mutations