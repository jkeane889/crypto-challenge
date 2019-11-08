const express = require('express');
const path = require('path');
const template = require('./views/template');
const app = express();

// serving static files
// app.use('/', express.static(path.resolve(__dirname, 'assets')));

app.listen(process.env.PORT || 5000);

const data = require('./assets/data.json');

let initialState = {
    isFetching: false,
    apps: data
};

// SSR function import
const ssr = require('./views/server');

app.get('/', (req, res) => {
    const { preloadedState, content } = ssr(initialState);
    const response = template("Server Rendered Page", preloadedState, content)
    res.setHeader('Cache-control', 'assets, max-age=604800')
    res.send(response);
});



