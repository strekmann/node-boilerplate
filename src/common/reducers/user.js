import Immutable from 'immutable';
import {
    SAVE_USER_INIT,
    SAVE_USER_SUCCESS,
    SAVE_USER_ERROR,
    LOAD_USER_SUCCESS } from '../constants';

const initialState = Immutable.fromJS({
    isSaving: false,
    errorMessage: '',
    formErrors: [],
    id: null,
});

function user(state = initialState, action) {
    switch (action.type) {
        case LOAD_USER_SUCCESS:
            return state.set('id', action.payload.get('id'));
        case SAVE_USER_INIT:
            return state.set('isSaving', true);
        case SAVE_USER_SUCCESS:
            return state.set('id', action.payload.get('id')).set('isSaving', false);
        case SAVE_USER_ERROR:
            return state.set('errorMessage', action.error).set('isSaving', false);
        default:
            return state;
    }
}

export default user;
