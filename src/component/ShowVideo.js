import React from 'react'

function ShowVideo(props) {
    return (
        <div className='show-Video-box'>
        <span className='cancel-btn' onClick={()=>props.setShowVideoItem('')}>X</span>
            <iframe
        width="640" height="360"
        src={`https://www.youtube.com/embed/${props.showVideoItem}`}
        frameborder="0"
></iframe>
        </div>
    )
}
export default ShowVideo