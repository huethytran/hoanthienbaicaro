import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import './index.css';
import Game from './containers/Game';

const redux = require('redux');

const store = redux.createStore(
  rootReducer,
  redux.compose(window.devToolsExtension ? window.devToolsExtension() : f => f)
);
store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
);
