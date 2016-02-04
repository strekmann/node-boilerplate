//import 'es6-promise';
//import fetch from 'isomorphic-fetch';
import request from 'superagent';

function testSuccess(payload) {
    return { type: 'TEST_SUCCESS', payload };
}

function testError() {
    return { type: 'TEST_ERROR' };
}

export function loadTest() {
    return (dispatch, getState) => {
        console.log('pre fetch');
        return request
        .get(':3000/api/1/auth/test')
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (err) {
                dispatch(testError(err));
            }
            else {
                dispatch(testSuccess(res.body));
            }
        });
    };
};
