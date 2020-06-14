import React from 'react';

const VideoDetail = (props) => {
    const video = props.video;

    if (!video) {
        return <div></div>
        //<div>Loading...</div>;
    }

    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;

    // var player;
    // const tag = document.createElement('script');
    // tag.src = 'https://www.youtube.com/iframe_api';
    // window.onYouTubeIframeAPIReady = loadVideo;
    // function loadVideo() {
    //     player = new window.YT.Player('player', {
    //         events: { 'onStateChange': onPlayerStateChange }
    //     });
    // }
    // function onPlayerStateChange(event) {
    //     if(event.data == 1){
    //         alert("ddd")
    //     }
    // }
   
    return (
        <div className="video-detail col-md-8" style={{ marginTop: "16px" }}>
            <div className="embed-responsive embed-responsive-16by9">
                <iframe id="player" className="embed-responsive-item" src={url} style={{ width: "80%", height: "300px" }}></iframe>
            </div>
            <div className="details">
                <div><span style={{fontWeight:"bold"}}>Currently playing: </span>{video.snippet.title}</div>
            </div>
        </div>
    );
};

export default VideoDetail;