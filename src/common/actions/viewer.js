import Immutable from 'immutable';
import { routeActions } from 'react-router-redux';

import fetch from '../lib/fetch';
import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
} from '../constants';

function loginUserSuccess(payload) {
    return {
        type: LOGIN_USER_SUCCESS,
        payload,
    };
}

function loginUserError(error) {
    return {
        type: LOGIN_USER_ERROR,
        error,
    };
}

function registerUserSuccess(payload) {
    return {
        type: REGISTER_USER_SUCCESS,
        payload,
    };
}

function registerUserError(error) {
    return {
        type: REGISTER_USER_ERROR,
        error,
    };
}

export function loginUser(payload) {
    return function loginUserAsync(dispatch) {
        return fetch('/auth/login', {
            method: 'post',
            body: JSON.stringify(payload),
            root: true,
        })
        .then((data) => {
            dispatch(loginUserSuccess(Immutable.fromJS(data.user)));
            dispatch(routeActions.push('/'));
        })
        .catch((error) => {
            dispatch(loginUserError(error.error));
        });
    };
}

export function registerUser(payload) {
    return function registerUserAsync(dispatch) {
        return fetch('/auth/register', {
            method: 'post',
            body: JSON.stringify(payload),
            root: true,
        })
        .then((data) => {
            dispatch(registerUserSuccess(Immutable.fromJS(data.user)));
            dispatch(routeActions.push('/'));
        })
        .catch((error) => {
            dispatch(registerUserError(error.error));
        });
    };
}
