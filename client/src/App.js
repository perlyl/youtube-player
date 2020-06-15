import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/Home';
import YouTubePlayer from './components/YouTubePlayer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import AuthRoute from './components/AuthRoute'
import Stats from './components/Stats';
import './style.scss';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute component={SignIn} path="/signin" exact />
          <PublicRoute component={SignUp} path="/signup" exact />
          <AuthRoute component={Stats} path="/stats" exact />
          <PrivateRoute component={YouTubePlayer} path="/youtube-player" exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;