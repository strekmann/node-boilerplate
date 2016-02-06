import fetch from 'isomorphic-fetch';
import * as types from '../constants';

function makeUserRequest(method, data, api='/login') {
    return fetch(api, {
        method: method,
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

// Log In Action Creators
function beginLogin() {
    return { type: types.MANUAL_LOGIN_USER };
}

function loginSuccess() {
    return { type: types.LOGIN_SUCCESS_USER };
}

function loginError() {
    return { type: types.LOGIN_ERROR_USER };
}

// Sign Up Action Creators
function signUpError() {
    return { type: types.SIGNUP_ERROR_USER };
}

function beginSignUp() {
    return { type: types.SIGNUP_USER };
}

function signUpSuccess() {
    return { type: types.SIGNUP_SUCCESS_USER };
}

// Log Out Action Creators
function beginLogout() {
    return { type: types.LOGOUT_USER};
}

function logoutSuccess() {
    return { type: types.LOGOUT_SUCCESS_USER};
}

function logoutError() {
    return { type: types.LOGOUT_ERROR_USER};
}


// Export actions
export function manualLogin(data) {
    return dispatch => {
        dispatch(beginLogin());

        return makeUserRequest('post', data, '/login')
        .then( response => {
            if (response.status === 200) {
                dispatch(loginSuccess());
            } else {
                dispatch(loginError());
            }
        });
    };
};

export function signUp(data) {
    return dispatch => {
        dispatch(beginSignUp());

        return makeUserRequest('post', data, '/signup')
        .then( response => {
            if (response.status === 200) {
                dispatch(signUpSuccess());
            } else {
                dispatch(signUpError());
            }
        });
    };
};

export function logOut() {
    return dispatch => {
        dispatch(beginLogout());


        return makeUserRequest('get', undefined, '/logout')
        .then( response => {
            if (response.status === 200) {
                dispatch(logoutSuccess());
            } else {
                dispatch(logoutError());
            }
        });
    };
};
