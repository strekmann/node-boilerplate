// import Immutable from 'immutable';

import { LOGIN_USER_SUCCESS, REGISTER_USER_SUCCESS } from '../constants';

function viewer(state, action) {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return state.set('id', action.payload.get('id'));
        case REGISTER_USER_SUCCESS:
            return state.set('id', action.payload.get('id'));
        default:
            return state;
    }
}

export default viewer;
