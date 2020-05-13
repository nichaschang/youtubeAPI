
//顯示當前頁數狀態
export const nowPageState=(val,nowPage)=>{
const nowPageStyle={
    fontWeight:'boldt',
    backgroundColor:'rgba(150,150,150,.75)',
}
    if(val===nowPage){
        return nowPageStyle
    }
}

//方向icon 頁數切換
export const changePage=(val,needPage)=>{
    if(val>=needPage){
        return needPage
    }else if(val===0){
        return 1
    }else{
        return val
    }
}