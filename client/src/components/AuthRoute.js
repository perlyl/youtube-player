import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LocalStorageGet } from '../Helpers';
import * as constants from '../Constants';

const AuthRoute = ({component: Component, ...rest}) => {
    let currentUser = JSON.parse(LocalStorageGet(constants.LOCAL_STORAGE_KEY.USER_DETAILS))
    const noPermission = <span >No permission</span> 
    return (
        <Route {...rest} render={props => (
            (!currentUser) ?
            <Redirect to="/signin" />:
            (!currentUser.isAdmin)?
            noPermission:
            <Component {...props} />
        )} />
    );
};

export default AuthRoute;