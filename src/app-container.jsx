import React from 'react';
import {ConnectedRouter} from 'react-router-redux';
import createBrowserHistory from "history/createBrowserHistory";
import { Provider } from 'react-redux';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {AppContainer} from 'react-hot-loader';

import defaults from "./app/config";
import config from 'atp-config';

config.setValues(defaults);

import {o} from "atp-sugar";

import modulesRaw from "./app/modules";

import createStore from './redux/store';

const modules = modulesRaw.reduce((joined, module) => joined.merge(module), o({})).raw;

const history = createBrowserHistory();
const store = createStore(modules.reducers, modules.init, history);

export default ({App}) =>
    <AppContainer>
        <DragDropContextProvider backend={HTML5Backend}>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <App modules={modules}/>
                </ConnectedRouter>
            </Provider>
        </DragDropContextProvider>
    </AppContainer>;
