import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Account from './containers/Account';

const routes = (
    <Route>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="account" component={Account} />
        </Route>
    </Route>
);

export default routes;
