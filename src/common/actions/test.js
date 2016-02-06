import fetch from 'isomorphic-fetch';
//import request from 'superagent';

function testSuccess(payload) {
    return { type: 'TEST_SUCCESS', payload };
}

function testError() {
    return { type: 'TEST_ERROR' };
}

export function loadTest() {
    return (dispatch, getState) => {
        console.log('pre fetch');
        return fetch('http://localhost:3000/api/1/auth/test', {
            method: 'get',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            if (res.status !== 200) {
                console.log(res);
            }
            return res.json();
        })
        .then(json => {
            console.log('success', json);
            return dispatch(testSuccess(json));
        })
        .catch(err => {
            console.log('error', err);
            return dispatch(testError());
        });
    };
};
