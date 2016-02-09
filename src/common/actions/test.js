import fetch from '../../server/lib/fetch';

function testSuccess(payload) {
    return { type: 'TEST_SUCCESS', payload };
}

function testError() {
    return { type: 'TEST_ERROR' };
}

export function loadTest() {
    return (dispatch, getState) => {
        console.log('pre fetch');
        return fetch('/api/1/auth/test')
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
