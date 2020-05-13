import React,{useState,useEffect} from 'react'
import {addFavorToLocalStorage,setFavorToLocalStorage,delFavorToLocalStorage,handleNewFavorToLocalStorage} from '../util/Handle_localStorage'
import {handleVideoImage,getVideoTime} from '../util/Handle_videoInfo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {getFavorVideoData,sendFavorVideoData} from '../util/action/index'
function Favorite(props) {

const [getFavor,setGetFavor]=useState([])
//影片ＩＤ 針對影片預覽更換使用
const [showVideo,setShowVideo]=useState('')
//影片名稱更改
const [showVideoName,setShowVideoName]=useState('')

    useEffect(() => {
        let localbox=setFavorToLocalStorage()
        let changeValbox=[]
        if(getFavor.length>0){
            for(let i=0;i<localbox.length;i++){
                let idx=getFavor.findIndex(e=>e==localbox[i])
                if(idx==-1){
                    changeValbox.push(localbox[i])
                }
            }
            setGetFavor(changeValbox)
        }else if(getFavor.length==0 && localbox.length>0){
            setGetFavor(setFavorToLocalStorage())
        }
    }, [])

    //當localStorage有變化要重新設定getFavor
    //

    useEffect(() => {
        console.log('getFavor',getFavor)
        if(getFavor.length>0){
            props.getFavorVideoData(getFavor)
        }
    }, [getFavor])
    

    useEffect(() => {
        console.log('props.getFavorVideoValue',props.getFavorVideoValue)
    }, [props.getFavorVideoValue])



    let favorDOM=[]
    let lastFavorVideoDOM=[]
    // <img src={handleVideoImage(v.snippet.thumbnails)} className='vedio-lastfavor-thumbnail margin-tb-1'/>
    //<img src={handleVideoImage(v.snippet.thumbnails)}  className='video-favor-thumbnail'/>
    props.getFavorVideoValue.map((v,i)=>{
        favorDOM.push(
            <li className='vedio-favor-list padding-1 margin-lr-auto' key={`${v}`} onClick={()=>{
                setShowVideoName(v.snippet.title)
                setShowVideo(v.id)
            }}>
            <div className='flex favor-thumbnail-idx'>
            <p className='vedio-favor-idx flex all-center'>{i+1}</p>
            <img src={handleVideoImage(v.snippet.thumbnails)}  className='video-favor-thumbnail'/>
           
            </div>
            <div className='flex favor-info'>
                <div className='flexColumn flex margin-lr-1 favor-info-txt'>
                        <div className='video-title'>
                            {v.snippet.title}
                        </div>
                        <div className='video-content'>
                            <p>頻道名稱</p>
                            <p>{v.snippet.channelTitle}</p>
                        </div>
                </div>
                <div className='video-favor-del' onClick={()=>{
                    addFavorToLocalStorage(getFavor[i],true)
                    handleNewFavorToLocalStorage(i,props.getFavorVideoValue)
                    //props.getFavorVideoValue(i,props.getFavorVideoValue)
                    setGetFavor(delFavorToLocalStorage(getFavor[i],getFavor))
                }}>取消收藏</div>

            </div>
            </li>
        )

        if(i==getFavor.length-1){
            lastFavorVideoDOM.push(
                <>
                <div className='video-lastFavor'>
<p>影片預覽：</p>
            <iframe
src={`https://www.youtube.com/embed/${showVideo?showVideo:v.id}?&autoplay=0`} frameborder="0" 
allowfullscreen className='vedio-lastfavor-thumbnail'></iframe>
                       
                        <div>
                        <p>影片名稱：</p>
                            <h3>{showVideoName?showVideoName:v.snippet.localized.title}</h3>
                        <h3>喜歡的影片</h3>
                        <p>共 {getFavor.length}部</p>
                        </div>
                        
                </div>
                </>
            )
        }
    })
    /*for(let i=0;i<getFavor.length;i++){
        favorDOM.push(
            <li className='vedio-favor-list padding-1 margin-lr-auto' key={`${getFavor[i]}`}>
            <p className='vedio-favor-idx flex all-center'>{i+1}</p>
            <img src='./images/test.jpg' className='vedio-favor-thumbnail'/>
            <div className='flex favor-info'>
                <div className='flexColumn flex margin-lr-1'>
                        <div className='video-title'>
                            this is title{getFavor[i]}
                        </div>
                        <div className='video-content'>
                            <p>頻道名稱</p>
                            <p>123123123</p>
                        </div>
                </div>
                <div className='video-favor-del' onClick={()=>{
                    addFavorToLocalStorage(getFavor[i],true)
                    setGetFavor(delFavorToLocalStorage(getFavor[i],getFavor))
                }}>取消收藏</div>

            </div>
            </li>
        )
        if(i==getFavor.length-1){
            lastFavorVideoDOM.push(
                <>
                <div className='video-lastFavor'>
                        <img src='./images/test.jpg' className='vedio-lastfavor-thumbnail margin-tb-1'/>
                        <div>
                        <p>最近加入的影片：</p>
                            <h3>this is title{getFavor[i]}</h3>
                        <h3>喜歡的影片</h3>
                        <p>共 {getFavor.length}部</p>
                        </div>
                        
                </div>
                </>
            )
        }
    }*/

    return (
        <>
        <div className='video-container spaceBetween'>
            
                {lastFavorVideoDOM}
            <ul className='video-favor-container'>
            {getFavor.length>0?favorDOM:''}
            </ul>
        </div>
        </>

    )
}

const mapStateToProps = store => {
    return {
        getFavorVideoValue:store.getFavorVideoValue
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        getFavorVideoData,sendFavorVideoData
      },
      dispatch
    )
  }
export default connect(mapStateToProps, mapDispatchToProps)(Favorite)
//export default Favorite
