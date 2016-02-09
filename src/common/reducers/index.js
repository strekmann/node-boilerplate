import userReducer from './user';

export default function reducer(state, action) {
    console.error("reducerstate", state);
    return {
        user: userReducer(state, action),
    };
}
