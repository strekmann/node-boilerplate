import React from 'react';
import { renderToString } from 'react-dom/server';
import Immutable from 'immutable';
import { Provider } from 'react-redux';
// import thunkMiddleware from 'redux-thunk';
import { RouterContext, match, createMemoryHistory } from 'react-router';
// import reducers from '../common/reducers/user';
import configureStore from '../common/stores';
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
    const store = configureStore(
        Immutable.Map({
            viewer: Immutable.fromJS(req.user || null),
            formErrors: Immutable.List(),
            errorMessage: '',
            isSaving: false,
            socket: Immutable.Map({
                usercount: 0,
            }),
        }), history);
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
            // Collect all async promises from components
            const promises = renderProps.components.map(function (component, index) {
                if (typeof component.fetchData !== 'function') {
                    return false;
                }
                return component.fetchData(store.dispatch);
            });

            // Then render when all promises are resolved
            Promise.all(promises).then(() => {
                const renderedContent = renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                );
                console.error("sEE", store.getState());

                const renderedPage = renderFullPage(renderedContent, store.getState(), {
                    title: headconfig.title,
                    meta: headconfig.meta,
                    link: headconfig.link,
                });
                res.send(renderedPage);
            });
        }
        else {
            res.status(404).send('Not found');
        }
    });
}
