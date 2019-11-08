import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './components/app';

// Read the state sent with markup
const state = window.__STATE__;

// delete the state from global window object
delete window.__STATE__;

// reproduce the store used to render the page on server
const store = configureStore(state);

/**
 *  hydrate the page to make sure both server
 *  and client side pages are identical. This includes markup
 *  checking, react comments to identify elements and more
 */

// hydrate is the same as render but it is used to hydrate elements
//  rendered by ReactDOMServer - ensures that the content is the same
//  on client and server
hydrate(
    <Provider store={store} >
        <App />
    </Provider>,
    document.querySelector('#app')
)