const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const fetch =require('node-fetch');


require('dotenv').config();
const app=express()
app.use(morgan('tiny'));
app.use(cors());


let cache;
const url=`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=${process.env.MAX_RES_ITEM}`;
/*const url=`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=HPlcL8MpAzk,dworC_RqzHw,zFDwECtUjRg&maxResults=${process.env.MAX_RES_ITEM}`;*/

const getVideos = (pageToken) => 
  fetch(`${url}&key=${process.env.GOOGLE_API_KEY}` + (pageToken ? `&pageToken=${pageToken}` : ''))
    .then(response => response.json())
    .then(console.log('pageToken',pageToken))
    ;


app.get('/videos',async (req,res)=>{
    
  if (cache) return res.json(cache);

  let page = await getVideos();
  let videos = page.items;

  while (page.nextPageToken) {
    page = await getVideos(page.nextPageToken);
    videos = videos.concat(page.items);
  }

  cache = videos;
  res.json(videos);
})




const favorUrl=`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=`

app.get('/videosFavor/:val',async (req,res)=>{
    
    fetch(`${favorUrl}${req.params.val}&key=${process.env.GOOGLE_API_KEY}`)
    .then(res=>res.json())
    .then(console.log('req',req.params.val))
    .then(val=>{
        return res.json(val.items)
    }).catch(err=>console.log('err',req.params.val))
})

function notFound(req,res,next){
    res.status(404)
    const error=new Error('找不到啦！ 404')
    next(error)
}

function errorHandle(err,req,res,next){
    res.status(res.statusCode||500)
    res.json({
        message:err.message
    })
}

app.use(notFound)
app.use(errorHandle)

const port=process.env.port || 5000
app.listen(port,()=>{
    console.log('express start with ',port)
})