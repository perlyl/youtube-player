import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LocalStorageGet } from '../Helpers';
import * as constants from '../Constants';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            LocalStorageGet(constants.LOCAL_STORAGE_KEY.USER_DETAILS) && restricted ?
                <Redirect to="/youtube-player" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;