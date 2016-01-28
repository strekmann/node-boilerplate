import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import createRoutes from '../common/routes';
import configureStore from '../common/configureStore';

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState, browserHistory);
const routes = createRoutes(store);

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>, document.getElementById('app')
);
