
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import YouTubePlayer from '../components/YouTubePlayer';
import { LocalStorageGet } from '../Helpers';
import * as constants from '../Constants';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: (LocalStorageGet(constants.LOCAL_STORAGE_KEY.USER_DETAILS))?true:false
        }
    }

    render() {
        const userNotLoggedInEl = <div className="no-user"><h1>You are not loggen in</h1><Link to="/signin">Go to sign in page</Link></div>
        return (
            <div className="home">
                {this.state.isLogin ? <YouTubePlayer /> : userNotLoggedInEl}
            </div>
        );
    }
}

export default Home;