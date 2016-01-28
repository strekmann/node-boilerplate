import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { syncHistory } from 'redux-simple-router';
import config from 'config';

export default function configureStore(initialState, history) {
    var middleware = [ thunk ];

    const router = syncHistory(history);
    if (config.util.getEnv('NODE_ENV') === 'development') {
        middleware.push(router, createLogger({logger: console}));
    }
    else {
        middleware.push(router);
    }

    const finalCreateStore = applyMiddleware(...middleware)(createStore);
    const store = finalCreateStore(rootReducer, initialState);

    return store;
};
