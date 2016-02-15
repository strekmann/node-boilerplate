import fetch from '../lib/fetch';
import Immutable from 'immutable';


export const SET_USERNAME = 'SET_USERNAME';
export function setUsername(payload) {
    return {
        type: SET_USERNAME,
        payload,
    };
}

export const SET_NAME = 'SET_NAME';
export function setName(payload) {
    return {
        type: SET_NAME,
        payload,
    };
}

export const SET_EMAIL = 'SET_EMAIL';
export function setEmail(payload) {
    return {
        type: SET_EMAIL,
        payload,
    };
}

export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export function loadUserSuccess(payload) {
    return {
        type: LOAD_USER_SUCCESS,
        payload,
    };
}

export const SAVE_USER_INIT = 'SAVE_USER_INIT';
function saveUserInit() {
    return {
        type: SAVE_USER_INIT,
    };
}

export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS';
function saveUserSuccess(payload) {
    return {
        type: SAVE_USER_SUCCESS,
        payload,
    };
}

export const SAVE_USER_ERROR = 'SAVE_USER_ERROR';
function saveUserError(error) {
    return {
        type: SAVE_USER_ERROR,
        error,
    };
}

export const LOAD_USER = 'LOAD_USER';
export function loadUser(id) {
    return function loadUserAsync(dispatch) {
        return fetch(`/profile/${id}`, {
            method: 'get',
        })
        .then(res => {
            const json = res.json();
            if (res.status >= 200 && res.status < 300) {
                return json;
            }
            return json.then(Promise.reject.bind(Promise));
        })
        .then((data) => {
            dispatch(loadUserSuccess(Immutable.fromJS(data.user)));
        })
        .catch((error) => {
            console.error(error);
            dispatch();
            //dispatch(saveUserError(error.error));
        });
    };
}

export const SAVE_USER = 'SAVE_USER';
export function saveUser(payload) {
    return function saveUserAsync(dispatch) {
        dispatch(saveUserInit());

        return fetch('/auth/account', {
            method: 'put',
            body: JSON.stringify({ user: payload }),
        })
        .then(res => {
            const json = res.json();
            if (res.status >= 200 && res.status < 300) {
                return json;
            }
            return json.then(Promise.reject.bind(Promise));
        })
        .then((data) => {
            dispatch(saveUserSuccess(Immutable.fromJS(data.user)));
        })
        .catch((error) => {
            dispatch(saveUserError(error.error));
        });
    };
}
