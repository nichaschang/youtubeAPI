import React, {useState,useEffect} from 'react'
import Video_outSide from '../component/Video_outSide'
import Pagination from '../component/Pagination'
import '../css/main.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {getVideoData} from '../util/action/index'
import {setFavorToLocalStorage} from '../util/Handle_localStorage'
function Home(props) {

// 獲取總共會有幾頁
const [needPage,setNeedPage]=useState(0)

//當前頁數
const [nowPage,setNowPage]=useState(0)

//產品初始值設定 最小值/最大值
const [itemMinIdx,setItemMinIdx]=useState(0)
const [itemMaxIdx,setItemMaxIdx]=useState(0)

//總項目數量
const [listAmount,setListAmount]=useState(10)

//初始設定
useEffect(()=>{

    //當前頁數第一頁
    setNowPage(1)
    //透過action要影片資料
    props.getVideoData()
},[])


useEffect(() => {
    //設定數量總數,判斷總共要幾個頁數使用
    setListAmount(props.getVideoValue.length)
    let pageTotal=Math.ceil(props.getVideoValue.length/9)
    //let pageTotal=Math.ceil(listAmount/9)
    //最後一頁的頁碼
    setNeedPage(pageTotal)
    /*if(props.getVideoValue.length>0){
        props.getVideoValue.map((v,i)=>{
        console.log('V = ',v)
        })

    }*/
}, [props.getVideoValue])

/*
useEffect(() => {
    console.log('needPage',needPage)
}, [needPage])*/

// 設定當前頁數的產品index 最大值/最小值
useEffect(()=>{
// 一頁6個品項
// 產品初始index為0 而nowPage 設定初始值為1，所以-1
let getMinIndex=(nowPage-1)*9
let getMaxIndex=nowPage*9
//設定產品 index 最小值 
setItemMinIdx(getMinIndex)
//設定產品 index 最大值 
setItemMaxIdx(getMaxIndex)

},[nowPage])

/*useEffect(()=>{
console.log('nowPage',nowPage)
console.log('needPage',needPage)
console.log('itemMinIdx',itemMinIdx)
console.log('itemMaxIdx',itemMaxIdx)
console.log('listAmount',listAmount)
},[nowPage,needPage,itemMinIdx,itemMaxIdx,listAmount])*/

    return (
        <div className='video-container margin-tb-1'>
            <Video_outSide
                listAmount={listAmount}
                itemMinIdx={itemMinIdx}
                itemMaxIdx={itemMaxIdx}
                videosData={props.getVideoValue}
            />
            <Pagination 
                needPage={needPage}
                nowPage={nowPage}
                setNowPage={(e)=>setNowPage(e)}
            />
        </div>
    )
}

//redux's reduecer
const mapStateToProps = store => {
    return {
        getVideoValue:store.getVideoValue,
        getFavorVideoValue:store.getFavorVideoValue
    }
  }
  
  //action
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        getVideoData,
      },
      dispatch
    )
  }
export default connect(mapStateToProps, mapDispatchToProps)(Home)
