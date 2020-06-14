import React from 'react';
import VideoListItem from './VideoListItem';

const VideoList = (props) => {
    const videoItems = props.videos.map((video) => {
        return (
            <VideoListItem 
                onUserSelected={props.onVideoSelect}           
                key={video.etag} 
                video={video} />
        );
    });

    return (
        <ul className="col-md-4 list-group" style={{listStyleType:"none",marginRight: "70px",width: "50%",overflowY:"auto", maxHeight:"400px"}}>
            {videoItems}
        </ul>
    );
};

export default VideoList;