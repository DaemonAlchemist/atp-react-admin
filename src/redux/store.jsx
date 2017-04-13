/* global window, __DEVELOPMENT__ */

import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { reducer as formReducer } from 'redux-form'
import {o} from "atp-sugar";

const logger = createLogger();

const middleware = __DEVELOPMENT__ ? [thunk, logger] : [thunk];

const createStoreWithMiddleware = (reducers, initialState) => createStore(
    combineReducers(o(reducers).merge({form: formReducer}).raw),
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default createStoreWithMiddleware;
