import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './components/app';

//  Instead of rendering app, need to wrap it in a function and export it
//  'configureStore' returns a new store instance and held in var 'store'
//  'renderToString' renders app to server and returns HTML produced
//  get the state out of Redux Store by calling getState(), keep it in a variable
//  return the content and preloaded state

module.exports = function render(initialState) {
    // configure the store with the initial state
    const store = configureStore(initialState);

    // render the App store static markup ins content variable
    let content = renderToString (<Provider store={store} ><App /></Provider>);

    // get a copy of store data to create the same store on the client side
    const preloadedState = store.getState();

    return {content, preloadedState};
};