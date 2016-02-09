import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { syncHistory } from 'react-router-redux';

export default function configureStore(initialState, history) {
    const middleware = [thunk];

    const router = syncHistory(history);
    if (process.env.NODE_ENV === 'development') {
        middleware.push(router, createLogger({ logger: console }));
    }
    else {
        middleware.push(router);
    }

    const finalCreateStore = applyMiddleware(...middleware)(createStore);
    console.error("initial", initialState);
    const store = finalCreateStore(reducers, initialState);

    return store;
}
