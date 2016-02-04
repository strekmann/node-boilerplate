import { combineReducers } from 'redux';
import { routeReducer as routing } from 'redux-simple-router';

import user from './user';
import test from './test';

const rootReducer = combineReducers({
    user,
    test
});

export default rootReducer;
