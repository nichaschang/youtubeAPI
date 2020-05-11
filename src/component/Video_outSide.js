import React from 'react'
import Video_List from './Video_List'
import '../css/main.css'

function Video_outSide(props) {
    
    let boxDOM=[]
    props.videosData.map((v,i)=>{
        if(props.itemMinIdx<=i && i<props.itemMaxIdx){
            boxDOM.push(
                <Video_List data={v}/>
            )
        }
    })
    


    return (
        <div className='video-container padding-r-0'>
        {boxDOM}
        </div>
    )
}

export default Video_outSide