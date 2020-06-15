import React from 'react';

const VideoListItem = (props) => {
    const video = props.video;
    const onUserSelected = props.onUserSelected;
    const imageUrl = video.snippet.thumbnails.default.url;

    return (
    <li onClick={() => onUserSelected(video)} className="list-group-item">
        <div className="video-list-item">
            <div>
                <img src={imageUrl} />
            </div>
            <div className="video-details">
                <div>{video.snippet.title}</div>
                <span className="desc">{video.snippet.description}</span>
            </div>
        </div>
    </li>
    );
};

export default VideoListItem;