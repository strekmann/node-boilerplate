import { combineReducers } from 'redux';

import user from './user';
import test from './test';

const rootReducer = combineReducers({
    user,
    test
});

export default rootReducer;
