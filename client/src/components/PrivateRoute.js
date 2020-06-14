import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { localStorageGet } from '../Helpers';
import * as constants from '../Constants';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            (localStorageGet(constants.LOCAL_STORAGE_KEY.USER_DETAILS)) ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;