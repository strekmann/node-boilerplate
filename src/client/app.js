import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import Immutable from 'immutable';
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { Router, browserHistory } from "react-router";
import routes from "../common/routes";
import reducers from '../common/reducers/user';

const initialState = Immutable.fromJS(window.__INITIAL_STATE__);
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers, initialState);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('main')
);
