export default function test(state={ test: 'init'}, action={}) {

    switch (action.type) {
        case 'TEST_SUCCESS':
            console.log('reducer', action);
            return Object.assign({}, state, {
                test: action.payload
            });
        default:
            return state;
    }
};
