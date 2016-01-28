import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Index from './containers/Index';
import Login from './containers/Login';
import Account from './containers/Account';

export default (store) => {
    const requireAuth = (nextState, replace, callback) => {
        if (!authenticated) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            });
        }
        callback();
    };

    return (
        <Route path="/" component={App}>
            <IndexRoute component={Index} />
            <Route path="login" component={Login} />
            <Route path="account" component={Account} onEnter={requireAuth} />
        </Route>
    );
};
