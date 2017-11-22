/* global window, __DEVELOPMENT__ */

import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import { reducer as formReducer } from 'redux-form'
import {routerReducer, routerMiddleware} from 'react-router-redux';

const createStoreWithMiddleware = (reducers, initialState, history) => createStore(
    combineReducers({
        ...reducers,
        form: formReducer,
        router: routerReducer
    }),
    initialState,
    compose(
        applyMiddleware(...(__DEVELOPMENT__ ? [thunk, createLogger(), routerMiddleware(history)] : [thunk, routerMiddleware(history)])),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default createStoreWithMiddleware;
