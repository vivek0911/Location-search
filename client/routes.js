import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/HomePage';
import LoginSignup from './containers/LoginSignup';
import LocationSearch from './containers/Location';

export default () => (<Route path="/" component={App} >
  <IndexRoute component={HomePage} />
  <Route path="login" component={LoginSignup} />
  <Route path="loc" component={LocationSearch} />
</Route>);
