import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import createRoutes from '../common/routes';
import reducers from '../common/reducers/user';
import io from 'socket.io-client';
import createLogger from 'redux-logger';
import { syncHistory } from 'react-router-redux';

const initialState = Immutable.fromJS(window.__INITIAL_STATE__);
const socket = io({ path: '/s' });
const socketMiddleware = createSocketIoMiddleware(socket, 'socket/');
const middleware = [socketMiddleware, thunk];

const router = syncHistory(browserHistory);
if (process.env.NODE_ENV === 'development') {
    middleware.push(router, createLogger({ logger: console }));
}
else {
    middleware.push(router);
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(reducers, initialState);
const routes = createRoutes(store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);

/*
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import Immutable from 'immutable';
import createRoutes from '../common/routes';
import configureStore from '../common/stores';

const initialState = Immutable.fromJS(window.__INITIAL_STATE__);

const store = configureStore(initialState, browserHistory);
const routes = createRoutes(store);

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>, document.getElementById('app')
);
*/
