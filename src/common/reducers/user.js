import { SAVE_USER_INIT, SAVE_USER_SUCCESS, SET_USERNAME, SET_NAME, SET_EMAIL } from '../actions/user';
import Immutable from 'immutable';

const initialState = Immutable.Map({
    viewer: Immutable.Map(),
    formErrors: Immutable.Map(),
    errorMessage: '',
    isSaving: false,
});

function app(state = initialState, action) {
    switch (action.type) {
        case SAVE_USER_INIT:
            return state.set('isSaving', true);
        case SAVE_USER_SUCCESS:
            return state.set('viewer', action.payload).set('isSaving', false);
        case SET_USERNAME:
            return state.setIn(['viewer', 'username'], action.payload);
        case SET_NAME:
            return state.setIn(['viewer', 'name'], action.payload);
        case SET_EMAIL:
            return state.setIn(['viewer', 'email'], action.payload);
        default:
            return state;
    }
}

export default app;
