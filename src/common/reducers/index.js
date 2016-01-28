import { combineReducers } from 'redux';
import { routeReducer as routing } from 'redux-simple-router';

import user from './user';

const rootReducer = combineReducers({
    user
});

export default rootReducer;
