import Immutable from 'immutable';

import fetch from '../lib/fetch';
import {
    LOAD_USER_SUCCESS,
    SAVE_USER_INIT,
    SAVE_USER_ERROR,
    SAVE_USER_SUCCESS,
} from '../constants';

function loadUserSuccess(payload) {
    return {
        type: LOAD_USER_SUCCESS,
        payload,
    };
}

function saveUserInit() {
    return {
        type: SAVE_USER_INIT,
    };
}

function saveUserSuccess(payload) {
    return {
        type: SAVE_USER_SUCCESS,
        payload,
    };
}

function saveUserError(error) {
    return {
        type: SAVE_USER_ERROR,
        error,
    };
}

export function loadUser(id, cookie) {
    return function loadUserAsync(dispatch) {
        return fetch(`/profile/${id}`, {
            method: 'get',
            cookie,
        })
        .then((data) => {
            dispatch(loadUserSuccess(Immutable.fromJS(data.user)));
        });
    };
}

export function saveUser(payload) {
    return function saveUserAsync(dispatch) {
        dispatch(saveUserInit());

        return fetch('/auth/account', {
            method: 'put',
            body: JSON.stringify({ user: payload }),
        })
        .then((data) => {
            dispatch(saveUserSuccess(Immutable.fromJS(data.user)));
        })
        .catch((error) => {
            dispatch(saveUserError(error.error));
        });
    };
}
