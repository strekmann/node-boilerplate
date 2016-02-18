import { SOCKET_SET_USERCOUNT } from '../constants';

import Immutable from 'immutable';
const initialState = Immutable.fromJS({
    usercount: 0,
});

function socket(state = initialState, action) {
    switch (action.type) {
        case SOCKET_SET_USERCOUNT:
            return state.set('usercount', action.payload);
        default:
            return state;
    }
}

export default socket;
