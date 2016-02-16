import { combineReducers } from 'redux-immutable';
import viewer from './user';
import users from './users';
import user from './user';
import socket from './socket';
import routeReducer from './routeReducer';

const reducer = combineReducers({
    viewer,
    users,
    user,
    socket,
    routing: routeReducer,
});

export default reducer;
