import { combineReducers } from 'redux-immutable';
import viewer from './viewer';
import user from './user';
import routeReducer from './routeReducer';

const reducer = combineReducers({
    viewer,
    user,
    routing: routeReducer,
});

export default reducer;
