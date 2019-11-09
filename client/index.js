// client/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes }  from 'react-router-config';
import { Provider } from 'react-redux';

import createStore from '../createStore';
import routes from '../routes.js'
import rootReducer from '../rootReducer';

const store = createStore(window.STORE_DATA);

const jsx = (
    <Provider store={store}>
        <Router>
                <div class="wrapper">{renderRoutes(routes)}</div>
        </Router>
    </Provider>
);

ReactDOM.hydrate(jsx, document.getElementById('app'));