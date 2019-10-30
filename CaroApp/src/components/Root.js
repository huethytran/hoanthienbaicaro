import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  HashRouter,
  Switch
} from 'react-router-dom';
import '../index.css';
import Game from '../containers/Game';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from './Register';

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/game" component={Game} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </HashRouter>
  </Provider>
);
Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
