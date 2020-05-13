import React ,{useState, useEffect}from 'react'
import '../css/main.css'
import {addFavorToLocalStorage,checkFavorState,setFavorToLocalStorage} from '../util/Handle_localStorage'
import {getVideoTime,handleVideoImage} from '../util/Handle_videoInfo'

function Video_List(props) {
const [favorState,setFavorState]=useState({opacity:0})
const [addFavorState,setAddFavorState]=useState(false)


useEffect(()=>{
    setFavorState(checkFavorState(props.data))
},[props.data])

useEffect(() => {
    setFavorToLocalStorage()
    //console.log('setFavorToLocalStorage',setFavorToLocalStorage())
    
}, [])

useEffect(()=>{
    if(favorState.opacity===0){
        setAddFavorState(false)
    }else{
        setAddFavorState(true)
    }
},[favorState])


useEffect(()=>{
    //console.log('addFavorState',addFavorState)

    console.log('EEEEEEEEEE = ',props.data.snippet)
},[addFavorState])
/*
 <div className='video-list'>
                <div className='video-head' key={props.data.id}>
                    <img src={imageRes} className='video-thumbnail'/>
                    <span className='video-time'>Time</span>
                    <div className='video-favor'>
                    <span className='video-favor-btn flex all-center' onClick={()=>{
                        addFavorToLocalStorage(props.data+1,addFavorState)
                        setFavorState(checkFavorState(props.data+1,favorState))
                    }}>{addFavorState?'取消收藏':'加入收藏'}</span>
                    <img src='/images/symbols.svg' className='video-favorlist-icon'/>
                    </div>
                    <div className="video-favorState">
                        <img src='/images/addFavor.svg' className='video-favor-icon' style={favorState} />
                    </div>
                </div>
                <div className='video-body'>
                    <div className='video-title'>
                        <h3>{props.data.snippet.localized.title}</h3>
                    </div>
                    <div className='video-content'>
                        <p>使用者名稱{props.data.snippet.channelTitle}</p>
                        <p>{props.data.snippet.localized.description}</p>
                    </div>
                </div>
            </div>
            <iframe
src={`https://www.youtube.com/embed/${props.data.id}?&autoplay=0`} frameborder="0" 
allowfullscreen className='video-thumbnail'></iframe>
*/
    return (
        <>        
            <div className='video-list'>

                <div className='video-head' key={props.data.id} >
<img src={handleVideoImage(props.data.snippet.thumbnails)} className='video-thumbnail'/>

                    <span className='video-time'>{getVideoTime(props.data.contentDetails.duration)}</span>
                    <div className='video-favor'>
                    <span className='video-favor-btn flex all-center' onClick={(e)=>{
                        addFavorToLocalStorage(props.data.id,addFavorState)
                        setFavorState(checkFavorState(props.data))
                    }}>{addFavorState?'取消收藏':'加入收藏'}</span>
                    <img src='/images/symbols.svg' className='video-favorlist-icon'/>
                    </div>
                    <div className="video-favorState">
                    
                        <img src='/images/addFavor.svg' className='video-favor-icon' style={favorState} />
                    </div>
                </div>
                <div className='video-body' onClick={(e)=>props.setShowVideoItem(props.data.id)}>
                    <div className='video-title'>
                        <h3>{props.data.snippet.localized.title}</h3>
                    </div>
                    <div className='video-content'>
                        <p>頻道名稱：{props.data.snippet.channelTitle}</p>
                        <p className='video-description'>{props.data.snippet.localized.description}</p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Video_List