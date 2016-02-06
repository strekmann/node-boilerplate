import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import createRoutes from '../common/routes';
import configureStore from '../common/configureStore';
import headconfig from '../common/components/Meta';

function renderFullPage(renderedContent, initialState, head={
    title: '<title>React Redux</title>',
    meta: '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    link: '<link rel="stylesheet" href="/css/styles.css"/>'
}) {
    return `
    <!doctype html>
    <html lang="">
    <head>
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

export default function render(req, res) {
    const history = createMemoryHistory();
    const authenticated = req.isAuthenticated();
    const store = configureStore({
        user: {
            authenticated: authenticated,
            isWaiting: false
        }
    }, history);
    const routes = createRoutes(store);

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
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

                const renderedPage = renderFullPage(renderedContent, store.getState(), {
                    title: headconfig.title,
                    meta: headconfig.meta,
                    link: headconfig.link
                });
                res.send(renderedPage);
            });
        }
        else {
            res.status(404).send('Not Found');
        }
    });
};
