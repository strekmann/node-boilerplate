import Immutable from 'immutable';
import {
    UPDATE_LOCATION
} from 'react-router-redux';

let initialState;

initialState = Immutable.fromJS({
    location: undefined
});

export default (state = initialState, action) => {
    if (action.type === UPDATE_LOCATION) {
        return state.merge({
            location: action.payload
        });
    }

    return state;
};
