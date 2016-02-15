import { SAVE_USER_INIT, SAVE_USER_SUCCESS, SAVE_USER_ERROR, SET_USERNAME, SET_NAME, SET_EMAIL } from '../actions/user';
import { SOCKET_SET_USERCOUNT } from '../actions/socket';

function viewer(state, action) {
    switch (action.type) {
        case SAVE_USER_INIT:
            return state.set('isSaving', true);
        case SAVE_USER_SUCCESS:
            return state.merge(action.payload).set('isSaving', false);
        case SAVE_USER_ERROR:
            return state.set('errorMessage', action.error).set('isSaving', false);
        case SET_USERNAME:
            return state.set('username', action.payload);
        case SET_NAME:
            return state.set('name', action.payload);
        case SET_EMAIL:
            return state.set('email', action.payload);
        case SOCKET_SET_USERCOUNT:
            return state.setIn(['socket', 'usercount'], action.payload);
        default:
            return state;
    }
}

export default viewer;
