import { LOAD_USER_SUCCESS, SAVE_USER_SUCCESS } from '../actions/user';

import Immutable from 'immutable';
const initialState = Immutable.Map();

function user(state = initialState, action) {
    switch (action.type) {
        case LOAD_USER_SUCCESS:
            return state.set(action.payload.get('id'), action.payload);
        case SAVE_USER_SUCCESS:
            return state.set(action.payload.get('id'), action.payload);
        default:
            return state;
    }
}

export default user;
