import fetch from '../lib/fetch';
import Immutable from 'immutable';


export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
function loginUserSuccess(payload) {
    return {
        type: LOGIN_USER_SUCCESS,
        payload,
    };
}

export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
function loginUserError(error) {
    return {
        type: LOGIN_USER_ERROR,
        error,
    };
}

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
function registerUserSuccess(payload) {
    return {
        type: REGISTER_USER_SUCCESS,
        payload,
    };
}

export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
function registerUserError(error) {
    return {
        type: REGISTER_USER_ERROR,
        error,
    };
}


export const LOGIN_USER = 'LOGIN_USER';
export function loginUser(payload) {
    return function loginUserAsync(dispatch) {
        return fetch('/auth/login', {
            method: 'post',
            body: JSON.stringify(payload),
            root: true,
        })
        .then(res => {
            const json = res.json();
            if (res.status >= 200 && res.status < 300) {
                return json;
            }
            return json.then(Promise.reject.bind(Promise));
        })
        .then((data) => {
            dispatch(loginUserSuccess(Immutable.fromJS(data.user)));
        })
        .catch((error) => {
            dispatch(loginUserError(error.error));
        });
    };
}

export const REGISTER_USER = 'REGISTER_USER';
export function registerUser(payload) {
    return function registerUserAsync(dispatch) {
        return fetch('/auth/register', {
            method: 'post',
            body: JSON.stringify(payload),
            root: true,
        })
        .then(res => {
            const json = res.json();
            if (res.status >= 200 && res.status < 300) {
                return json;
            }
            return json.then(Promise.reject.bind(Promise));
        })
        .then((data) => {
            dispatch(registerUserSuccess(Immutable.fromJS(data.user)));
        })
        .catch((error) => {
            dispatch(registerUserError(error.error));
        });
    };
}
