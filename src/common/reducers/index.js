import { combineReducers } from 'redux-immutable';
import user from './user';
import routeReducer from './routeReducer';

const reducer = combineReducers({
    viewer: user,
    routing: routeReducer,
});

export default reducer;
