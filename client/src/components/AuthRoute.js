import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { localStorageGet,localStorageRemove } from '../Helpers';
import * as constants from '../Constants';

const AuthRoute = ({component: Component, ...rest}) => {
    let currentUser = JSON.parse(localStorageGet(constants.LOCAL_STORAGE_KEY.USER_DETAILS))
    // const handleLogout = () => {
    //     localStorageRemove(constants.LOCAL_STORAGE_KEY.USER_DETAILS);
    //     currentUser = null
    // }
   
    // <button onClick={this.handleLogout}> Log out</button >
    const noPermission = <span >No permission</span> 
    {/* <button onClick={handleLogout}> Log out</button ></div> */}
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