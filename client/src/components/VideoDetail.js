import React from 'react';

const VideoDetail = (props) => {
    const video = props.video;
    
    if(!video){
        return <div>Loading...</div>;
    }
    
    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    return (
        <div className="video-detail col-md-8" style={{marginTop:"16px"}}>
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url} style={{width:"80%", height:"300px"}}></iframe>
            </div>
            <div className="details">
                <div><span style={{fontWeight:"bold"}}>Currently playing: </span>{video.snippet.title}</div>
            </div>
        </div>
    );
};

export default VideoDetail;