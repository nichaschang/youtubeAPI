import React ,{useState,useEffect} from 'react'
import {nowPageState,changePage} from '../util/Handle_page'

function Pagination(props) {



//頁數顯示最大值
const [nowMaxPage,setNowMaxPage]=useState(0)
//頁數顯示最小值
const [nowMinPage,setNowMinPage]=useState(0)

//頁數階層
const [pageStep,setPageStep]=useState(1)
const [pageMaxStep,setPageMaxStep]=useState(1)

useEffect(() => {
    let max=Math.ceil(props.needPage/5)
    setPageMaxStep(max)
    if(props.nowPage>5*pageStep){
        if(pageStep==pageMaxStep){
        setPageStep(pageMaxStep)
        }else{
            setPageStep(pageStep+1)
        }
    }else{
        if(pageStep!=1){
            if(props.nowPage<=5*(pageStep-1)){
                setPageStep(pageStep-1)
            }
        }
    }
}, [props.nowPage,props.needPage])

useEffect(() => {
    let min=5*pageStep-5+1
    if(min<=0){
        setNowMinPage(1)
    }else{
        setNowMinPage(min)
    }

    let max=5*pageStep
    if(max>=props.needPage){
        setNowMaxPage(props.needPage)
    }else{
        setNowMaxPage(max)
    }
    //console.log('pageStep',pageStep)
}, [pageStep,props.needPage])

/*useEffect(() => {
    console.log('nowMinPage',nowMinPage)
    console.log('nowMaxPage',nowMaxPage)
}, [nowMinPage,nowMaxPage])*/


    let pageBox=[]
    for(let i=nowMinPage;i<=nowMaxPage;i++){
        pageBox.push(
            <>
                <span className='page-list flex all-center' key={`page-${i}`} style={nowPageState(i,props.nowPage)} onClick={()=>props.setNowPage(i)}>{i}</span>
            </>
        )
    }

    return (
        <div className='page-box'>
        <img src='/images/left-arrow.svg' className='page-list flex all-center' onClick={()=>{
        props.setNowPage(changePage(props.nowPage-1,props.needPage))
        }}/>
            {pageBox}
        <img src='/images/right-arrow.svg' className='page-list flex all-center' onClick={()=>
        props.setNowPage(changePage(props.nowPage+1,props.needPage))
            }/>

<span className='page-list flex all-center' key={`page-${props.needPage}`} style={nowPageState(props.needPage,props.nowPage)} onClick={()=>props.setNowPage(props.needPage)}>{props.needPage}</span>
        </div>
    )
}
export default Pagination
