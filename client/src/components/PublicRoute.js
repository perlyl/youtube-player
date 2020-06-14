import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { localStorageGet } from '../Helpers';
import * as constants from '../Constants';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            localStorageGet(constants.LOCAL_STORAGE_KEY.USER_DETAILS) && restricted ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;