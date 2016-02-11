import { LOAD_USER_SUCCESS, SAVE_USER_INIT, SAVE_USER_SUCCESS, SAVE_USER_ERROR, SET_USERNAME, SET_NAME, SET_EMAIL } from '../actions/user';
import { SOCKET_SET_USERCOUNT } from '../actions/socket';

function user(state, action) {
    switch (action.type) {
        case LOAD_USER_SUCCESS:
            return state.set('user', action.payload);
        case SAVE_USER_INIT:
            return state.set('isSaving', true);
        case SAVE_USER_SUCCESS:
            return state.set('viewer', action.payload).set('isSaving', false);
        case SAVE_USER_ERROR:
            return state.set('errorMessage', action.error).set('isSaving', false);
        case SET_USERNAME:
            return state.setIn(['viewer', 'username'], action.payload);
        case SET_NAME:
            return state.setIn(['viewer', 'name'], action.payload);
        case SET_EMAIL:
            return state.setIn(['viewer', 'email'], action.payload);
        case SOCKET_SET_USERCOUNT:
            return state.setIn(['socket', 'usercount'], action.payload);
        default:
            return state;
    }
}

export default user;
