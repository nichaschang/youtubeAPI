import fetch from "node-fetch"

export const getVideoData=()=>{
    return async dispatch =>{
        const request=new Request('http://localhost:5000/videos',{
            method:'GET',
        })
        const res = await fetch(request)
        const data=await res.json()
        await console.log('data getVideos',data)
        dispatch(sendVideoData(data))
    }
}

export const sendVideoData=val=>({type:'ADD_VIDEO',value:val})

export const getFavorVideoData=(val)=>{
    return async dispatch =>{
        const request=new Request(`http://localhost:5000/videosFavor/${val}`,{
            method:'GET',
        })
        const res = await fetch(request)
        const data=await res.json()
        await console.log('data getFavor',data)
        dispatch(sendFavorVideoData(data))
    }
}

export const sendFavorVideoData=val=>({type:'ADD_FAVORVIDEO',value:val})