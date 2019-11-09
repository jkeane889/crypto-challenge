// isomorphic javascript with 'import'
import express from 'express';
import { matchRoutes } from 'react-router-config';
import renderer from './renderer';
import createStore from './createStore';

const app = express();
const port = 3000;

app.get('*', (req, res) => {
    const result = renderer();
    res.send(result);
    // const store = createStore({});
    // const promises = matchRoutes(routes, req.path).map(
    //     ({ route, match}) => (route.loadData ? route.loadData(store, match, req.get('cookie') || {}, req.query) : null)
    // );

    // Promise.all(promises).then(() => {
    //     const result = renderer(req);
    //     const context = result.context;
    //     if (context && context.status !== undefined) {
    //         res.status(context.status);
    //     }
    //     res.send(result.jsx);
    // })
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});