//第一次取值
export const setFavorToLocalStorage=()=>{
    let localStorageFavor =localStorage.getItem('favorite')||[]
    if(localStorageFavor.length===0){
        localStorage.setItem('favorite', [])
    }else{
        return JSON.parse(localStorageFavor)
    }
}

//針對加入收藏或取消
export const addFavorToLocalStorage=(val,state)=>{
    console.log('state',state)  //確認是否為加入或取消收藏 boolean_Value
    console.log('val',val)//加入的影片內容
    //console.log('val',val.id)//加入的影片內容
    let newValue=val
        let localStorageFavor =localStorage.getItem('favorite')||[]
        let newItem=[]
        if(localStorageFavor.length===0){
            localStorage.setItem('favorite', [])
        }else{
            newItem=JSON.parse(localStorageFavor)
        }

        let idx=newItem.findIndex(e=>e==newValue)
        let delIdx=newItem.filter(e=>e!==newValue)
        if(state==false){
            if(idx==-1){
                newItem.push(newValue)
            }
        }else{
            //console.log('delidx',delIdx)
            newItem=delIdx
        }

        localStorage.setItem('favorite', JSON.stringify(newItem))
    }

    //處理hook-getFavor 只處理得到id
    export const delFavorToLocalStorage=(val,data)=>{
        let delIdx=data.filter(e=>e!==val)
        return delIdx
    }

    //處理收藏的store（getFavorVideoValue） 只處理得到整筆內容
    export const handleNewFavorToLocalStorage=(val,data)=>{
        console.log('val',val)
        console.log('data',data)
    }
    
export const checkFavorState=(val)=>{
    console.log('val',val)
    let newValue=val.id
    let newObj=new Object()
    let localStorageFavor =localStorage.getItem('favorite')||[]
    if(localStorageFavor.length!==0){
        let arr=JSON.parse(localStorageFavor)
        for(let i=0;i<arr.length;i++){
            if(newValue==arr[i]){
                newObj.opacity=1
                return newObj
            }
        }
        newObj.opacity=0
        return newObj
    }else{
        newObj.opacity=0
        return newObj
    }
}
