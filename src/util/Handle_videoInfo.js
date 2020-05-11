//將丟入得值傳給下個函式判斷 時,分,秒的數字內容
export const getVideoTime=(val)=>{    
    let hourNum=handleTimeStr(val,'H')
    let minNum=handleTimeStr(val,'M')
    let secNum=handleTimeStr(val,'S')
    let res=hourNum+':'+minNum+':'+secNum

    return res
}


//去除字串,並轉為需要的數字及格式
export const handleTimeStr=(val,str)=>{
    let num=/[0-9]/
    const regex=RegExp(num)
    let txtArr=val.split('')

    // 獲取的格式為 PT xx H xx M xx S
    let checkIndx=txtArr.lastIndexOf(str)
    let res='';
    
    //確認是否有數字存在？ 並獲得index值
    //第二個if為判斷取得的兩個值是否皆為數字
    //如果只取到一個數字,則前面補一個0
    //如果判斷都沒有數字則回傳00
    if(checkIndx!=-1){
        for(let i=2;i>0;i--){
            if(regex.test(txtArr[checkIndx-i])){
                res+=txtArr[checkIndx-i]
            }else{
                res+='0'
            }
        }
    }else{
        res='00'
    }
    return res
}

//判斷影片的顯示圖片應該為哪一個url
export const handleVideoImage=(val)=>{
    let res;
    if(val.standard){
        res=val.standard.url
    }else if(val.high){
        res=val.high.url
        
    }else if(val.default){
        res=val.default.url
    }else{
        res='./images/test.jpg'
    }
    return res
}
