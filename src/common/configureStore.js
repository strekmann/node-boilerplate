import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { syncHistory } from 'redux-simple-router';

export default function configureStore(initialState, history) {
    var middleware = [ thunk ];

    const router = syncHistory(history);
    if (__DEV__) {
        middleware.push(router, createLogger());
    }
    else {
        middleware.push(router);
    }

    const finalCreateStore = applyMiddleware(...middleware)(createStore);
    const store = finalCreateStore(rootReducer, initialState);

    return store;
};
