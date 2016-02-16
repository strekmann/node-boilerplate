import { SAVE_USER_SUCCESS } from '../actions/user';

import Immutable from 'immutable';
const initialState = Immutable.Map();

function user(state = initialState, action) {
    switch (action.type) {
        case SAVE_USER_SUCCESS:
            console.log('i can haz save');
            return state.set(action.payload.get('id'), action.payload);
        default:
            return state;
    }
}

export default user;
