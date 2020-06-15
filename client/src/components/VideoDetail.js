import React from 'react';

const VideoDetail = (props) => {
    const video = props.video;   
    if (!video) {
    return <div className="video-detail"><iframe id="player"></iframe></div>
    }
    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    return (
        <div className="video-detail">
            <div>
                <iframe id="player" src={url}></iframe>
            </div>
            <div>
               <div><span className="title">Currently playing: </span>{video.snippet.title}</div>
            </div>
        </div>
    );
};

export default VideoDetail;