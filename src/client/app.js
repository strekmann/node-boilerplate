import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import routes from '../common/routes';
import reducers from '../common/reducers/user';
import io from 'socket.io-client';

const socket = io({ path: '/s' });
const socketMiddleware = createSocketIoMiddleware(socket, 'socket/');
const initialState = Immutable.fromJS(window.__INITIAL_STATE__);
const createStoreWithMiddleware = applyMiddleware(socketMiddleware, thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers, initialState);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('main')
);
