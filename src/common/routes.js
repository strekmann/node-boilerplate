import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Account from './containers/Account';

export default (store) => {
    const requireAuth = (nextState, replace, callback) => {
        const { viewer } = store.get('viewer');
        if (!viewer) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname },
            });
        }
        callback();
    };

    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="account" component={Account} onEnter={requireAuth} />
        </Route>
    );
};
