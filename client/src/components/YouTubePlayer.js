import React from 'react';
import { MakePostRequest, LocalStorageRemove, LocalStorageGet, MakeGetRequest, HandleServerError, GetDuration} from '../Helpers';
import * as constants from '../Constants';
import { withRouter } from 'react-router-dom';
import SearchBar from './SearchBar';
import VideoList from './VideoList'
import VideoDetail from './VideoDetail';

class YouTubePlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null,
            currentUser: JSON.parse(LocalStorageGet(constants.LOCAL_STORAGE_KEY.USER_DETAILS)),
            timeStart:null,
            actionId:null

        };
    }

    videoSearch = (searchTerm) => {
        if (!searchTerm) {
            return
        }
        const url = "https://www.googleapis.com/youtube/v3/search"
        const params = {
            part: 'snippet',
            key: constants.API_KEY,
            q: searchTerm,
            maxResults: 5
        };
        MakeGetRequest(url, params, (err, response) => {
            if (err) {
                HandleServerError()
                return
            }
            const data = JSON.parse(response)
            this.setState({
                videos: data.items,
                selectedVideo: data.items[0]
            });
            this.addActionLog(constants.ACTION_TYPE.SEARCH, searchTerm)
            this.loadVideo();
        })

    }
    addActionLog = (action,value) => {
        const currentUser = JSON.parse(LocalStorageGet(constants.LOCAL_STORAGE_KEY.USER_DETAILS))
        MakePostRequest(constants.SERVER_URL + 'addActionLog', {userId:currentUser.userId, fullName:currentUser.fullName, action:action, value:value}, (err, res) => {
            if (err) {
                HandleServerError()
            }
            this.setState({actionId:JSON.parse(res).actionId})
        })
    }
    updateActionLog = (fields)=>{
        MakePostRequest(constants.SERVER_URL + 'updateActionLog', fields, (err, res) => {
            if (err) {
                HandleServerError()
            }
        })
    }
    handleLogout = () => {
        LocalStorageRemove(constants.LOCAL_STORAGE_KEY.USER_DETAILS);
        this.props.history.push('/signin');
    }
    loadVideo = () => {
        console.log("loadVideo")
        this.player = new window.YT.Player('player', {
            events: { 'onStateChange': this.onPlayerStateChange }
        });
    }
    componentDidMount = () => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            window.onYouTubeIframeAPIReady = this.loadVideo;
        }
    };

    videoSelected = (userSelected) => {
        this.setState({ selectedVideo: userSelected })
        this.loadVideo();
    }

    onPlayerStateChange = (event) => {
        console.log("onPlayerStateChange")
        const STATE = {
            PLAYING: 1,
            PAUSED: 2,
            ENDED: 0
        }
        if (event.data == STATE.PLAYING) {
            console.log("PLAYING")
            this.setState({timeStart:new Date()})
            this.addActionLog(constants.ACTION_TYPE.WATCH, event.target.playerInfo.videoData.title)
        }
        else if (event.data == STATE.PAUSED || event.data == STATE.ENDED) {
            console.log("PAUSED || ENDED")
            this.updateActionLog({actionId:this.state.actionId, fields:{duration:GetDuration(this.state.timeStart)}});
        }
    }

    goToStatsPage = () => {
        this.props.history.push('/stats');
    }
    render() {
        let showStatsBtn = ''
        if (this.state.currentUser.isAdmin) {
            showStatsBtn = <div className="stats-btn"><button onClick={this.goToStatsPage}>Show Stats</button></div>
        }
        return (
            <div className="youtube-player">
                {showStatsBtn}
                <div className="log-out">
                    <span className="user-name">{this.state.currentUser.fullName}</span>
                    <button onClick={this.handleLogout}> Log out</button >
                </div>
                <br />  <br />  <br />
                <SearchBar onSearchTermChange={searchTerm => this.videoSearch(searchTerm)} />
                <div className="videos-area">
                    <VideoList
                        onVideoSelect={(userSelected) => this.videoSelected(userSelected)}
                        videos={this.state.videos} />
                    <VideoDetail video={this.state.selectedVideo} />
                </div>
            </div >

        );
    }
};

export default withRouter(YouTubePlayer);