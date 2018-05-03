import React, { Component } from 'react';

import Login from './containers/LoginContainer'
import Welcome from './containers/WelcomeContainer'
import AutoLogin from './containers/AutoLoginContainer'
import Accessing from './containers/AccessingContainer'
import FriendlyLayout from './components/Layouts/Screen/Friendly'
import PublicLayout from './components/Layouts/Screen/Screen'

import { Provider } from "react-redux";
import { BrowserRouter, Router, Route, Switch, Redirect } from 'react-router-dom';
import configureStore from './store/configurateStore'
import history from './history/browserHistory'
import { fakeAuth } from './http/fakeAuth'
import { PrivateRoutes, FriendlyRoutes } from './routes/PrivateRoutes'


const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={ history }>
          <Switch>
            <FriendlyRoutes path='/app' component={ FriendlyLayout } />

            <Route path="/auth" component={ PublicLayout } />
            <Route path="/welcome" component={ Welcome } />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
