import ReactDOMServer from 'react-dom/server';
import Router from 'isomorphic-relay-router';
import RelayLocalSchema from 'relay-local-schema';
// import Helmet from 'react-helmet';
import { match } from 'react-router';
import routes from '../common/routes';
// import headconfig from '../common/components/Meta';
import schema from './api/schema';
import 'cookie-parser';

function renderFullPage(renderedContent, initialState, head = {
    title: '<title>React Relay</title>',
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
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
        if (err) {
            return next(err);
            // res.status(500).send(err.message);
        }
        else if (redirectLocation) {
            return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }
        else if (renderProps) {
            let rootValue = {};
            if (req.user) {
                rootValue = { viewer: JSON.parse(JSON.stringify(req.user)) };
            }
            const networkLayer = new RelayLocalSchema.NetworkLayer({
                schema,
                rootValue,
                onError: (errors, request) => next(new Error(errors)),
            });
            return Router.prepareData(renderProps, networkLayer).then(({ data, props }) => {
                try {
                    global.navigator = { userAgent: req.headers['user-agent'] };
                    const renderedContent = ReactDOMServer.renderToString(Router.render(props));
                    // const helmet = Helmet.rewind();

                    const renderedPage = renderFullPage(renderedContent, data);
                    return res.send(renderedPage);
                }
                catch (err) {
                    return next(err);
                }
            }, next);
        }
        return next();
    });
}
