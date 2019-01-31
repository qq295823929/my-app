var mutations={
    tologin(state,num){
        state.isLogin = num;
    },
    savePersonnalData(state,obj){
        state.personnalData=obj
        console.log(state.personnalData);////
    },
    updataInfo(state,obj){
        // console.log(obj);
        // state=
        for(let [key,val] of Object.entries(JSON.parse(obj))){
            state[key] = val;
        }
        console.log(state);
        // alert("更新state为"+JSON.stringify(state)+"11111111111111")

    }
}

export default mutations