// is put under 'test' in store
export default function test(state={}, action={}) {
    switch (action.type) {
        case 'TEST_SUCCESS':
            console.log('reducer', action);
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};
