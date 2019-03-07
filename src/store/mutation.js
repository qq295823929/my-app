var mutations={
    tologin(state,num){
        state.isLogin = num;
    },
    savePersonnalData(state,obj){
        state.personnalData=obj;
        // for(let [key,val] of Object.entries(obj)){
        //     state[key] = val;
        // }
        console.log(state.personnalData);////
    },
    updataInfo(state,obj){
        // console.log(obj);
        // state=
        // alert(JSON.stringify(obj)+"11111111111111")
        for(let [key,val] of Object.entries(JSON.parse(obj))){
            state[key] = val;
        }
        // console.log(state);
        // alert("更新state为"+JSON.stringify(state)+"11111111111111")
    }
}

export default mutations