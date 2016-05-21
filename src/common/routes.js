import React from 'react';
import Relay from 'react-relay';
import { Route, IndexRoute, createRoutes } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import Account from './containers/Account';
/*
import Profile from './containers/Profile';
*/

export const queries = {
    viewer: () => Relay.QL`query { viewer }`,
};

export default createRoutes(
    <Route path="/" component={App} queries={queries}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} queries={queries} />
        <Route path="register" component={Register} queries={queries} />
        <Route path="account" component={Account} queries={queries} />
    </Route>
);
/*
    <Route path="/" component={App}>
        <Route path="profile/:id" component={Profile} />
    </Route>
);
*/
