import React from 'react';
import { renderToString } from 'react-dom/server';
import Immutable from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import reducers from '../common/reducers';
import createRoutes from '../common/routes';
import headconfig from '../common/components/Meta';
import 'cookie-parser';

function renderFullPage(renderedContent, initialState, head = {
    title: '<title>React Redux</title>',
    meta: '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    link: '<link rel="stylesheet" href="/css/styles.css"/>',
}) {
    return `
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8" />
        ${head.title}
        ${head.meta}
        ${head.link}
    </head>
    <body>
        <div id="app">${renderedContent}</div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/js/site.js"></script>
    </body>
    </html>
    `;
}

export default function render(req, res, next) {
    const history = createMemoryHistory();
    const initialState = Immutable.fromJS(res.store);

    const router = syncHistory(history);
    const middleware = [thunk, router];

    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
    const store = createStoreWithMiddleware(reducers, initialState);
    const routes = createRoutes(store);

    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
        if (err) {
            return next(err);
            // res.status(500).send(err.message);
        }
        else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }
        else if (renderProps) {
            const renderedContent = renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );

            const renderedPage = renderFullPage(renderedContent, store.getState(), {
                title: headconfig.title,
                meta: headconfig.meta,
                link: headconfig.link,
            });
            res.send(renderedPage);
        }
        else {
            return next();
        }
    });
}
