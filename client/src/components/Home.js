
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { localStorageGet } from '../Helpers';
import * as constants from '../Constants';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogin: (localStorageGet(constants.LOCAL_STORAGE_KEY.USER_DETAILS))?true:false
        }

    }

    render() {
        const userNotLoggedInEl = <div style={{ textAlign: "center" }}><h1 style={{ color: "red" }}>You are not loggen in</h1><Link to="/signin">Go to sign in page</Link></div>
        return (
            <div>
                {this.state.isLogin ? <Dashboard /> : userNotLoggedInEl}
            </div>
        );
    }
}

export default Home;