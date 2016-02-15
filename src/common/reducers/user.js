import { LOAD_USER_SUCCESS } from '../actions/user';

function user(state, action) {
    switch (action.type) {
        case LOAD_USER_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export default user;
