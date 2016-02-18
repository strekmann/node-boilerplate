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

export const LOAD_USER = 'LOAD_USER';
export function loadUser(id) {
    return function loadUserAsync(dispatch) {
        return fetch(`/profile/${id}`, {
            method: 'get',
        })
        .then((data) => {
            dispatch(loadUserSuccess(Immutable.fromJS(data.user)));
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
        .then((data) => {
            dispatch(saveUserSuccess(Immutable.fromJS(data.user)));
        })
        .catch((error) => {
            dispatch(saveUserError(error.error));
        });
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
        .then((data) => {
            dispatch(registerUserSuccess(Immutable.fromJS(data.user)));
        })
        .catch((error) => {
            dispatch(registerUserError(error.error));
        });
    };
}
