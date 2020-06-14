import React from 'react';
import { localStorageRemove, localStorageGet, MakeGetRequest, HandleServerError, addActionLog } from '../Helpers';
import * as constants from '../Constants';
import { withRouter } from 'react-router-dom';
import SearchBar from './SearchBar';
import VideoList from './VideoList'
import VideoDetail from './VideoDetail';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null,
            currentUser: JSON.parse(localStorageGet(constants.LOCAL_STORAGE_KEY.USER_DETAILS)),
            
        };
        //this.videoSearch('');
    }

    videoSearch = (searchTerm) => {
        if(!searchTerm){
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
            addActionLog(constants.ACTION_TYPE.SEARCH, searchTerm)
        })

    }

    handleLogout = () => {
        localStorageRemove(constants.LOCAL_STORAGE_KEY.USER_DETAILS);
        this.props.history.push('/signin');
    }

    videoSelected = (userSelected) => {
        this.setState({ selectedVideo: userSelected })
        addActionLog(constants.ACTION_TYPE.WATCH, userSelected.snippet.title)
    }
    goToStatsPage = () => {
        this.props.history.push('/stats');
    }
    render() {
        let showStatsBtn = ''
        if(this.state.currentUser.isAdmin){
            showStatsBtn = <div style={{ float: "left" }}><button onClick={this.goToStatsPage}>Show Stats</button></div>
        }
        return (
            <div>
                {showStatsBtn}
                <div style={{ float: "right" }}>
                    <span style={{ margin: "5px" }}>{this.state.currentUser.fullName}</span>
                    <button onClick={this.handleLogout}> Log out</button >
                </div>
                <br />  <br />  <br />
                <SearchBar onSearchTermChange={searchTerm => this.videoSearch(searchTerm)} />
                <div style={{ display: "flex" }}>
                    <VideoList
                        onVideoSelect={(userSelected) => this.videoSelected(userSelected)}
                        videos={this.state.videos} />
                    <VideoDetail video={this.state.selectedVideo} />
                </div>
            </div >

        );
    }
};

export default withRouter(Dashboard);