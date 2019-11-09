// renderer.js

import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from './routes.js';

function renderer(req) {

    const content = {};
    const state = store.getState();

    const content = renderToString(
        <Router context={context} location={req.path} query={req.query}>
            <div>{renderRoutes(routes)}</div>
        </Router>
    )

    const jsx = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>

        <body>
            <div id="app">${content}</div>
            <script>
                window.STORE_DATA = ${serialize(state).replace('<script>', '')}
            </script>
            <script src="/bundle.js"></script>
        </body>
        </html>    
    `;

    return {jsx, context};
};

export default renderer;