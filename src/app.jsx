import React from 'react';
import {ConnectedRouter} from 'react-router-redux';
import createBrowserHistory from "history/createBrowserHistory";
import { Provider } from 'react-redux';
import {Grid, Row} from "react-bootstrap";
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {AppContainer} from 'react-hot-loader';

import defaults from "../config/defaults";
import config from 'atp-config';

config.setValues(defaults);

import {o} from "atp-sugar";

import comic from 'atp-comic';
import entity from "atp-redux-entity";
import flash from "atp-flash";
import media from "atp-media";
import uac from "atp-uac";
import ui from "atp-ui";
import inlineEdit from "atp-inline-edit";
import tree from 'atp-tree';
import tabRouter from 'atp-react-tab-router';


import {Navbar} from "atp-ui";
import {Authenticated} from "atp-uac";
import {LoginForm} from "atp-uac";
import {FlashMessages} from "atp-flash";
import {TabRouter} from 'atp-react-tab-router';

import createStore from './redux/store';

const modules = [
    comic, entity, flash, inlineEdit, media, uac, ui, tree, tabRouter
].reduce((joined, module) => joined.merge(module), o({})).raw;

const history = createBrowserHistory();
const store = createStore(modules.reducers, modules.init, history);

export default () =>
    <AppContainer>
        <DragDropContextProvider backend={HTML5Backend}>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Grid fluid={true}>
                        <Authenticated yes>
                            <Row>
                                <Navbar title={"ATP Admin!"} leftMenu="main" rightMenu="altMain"/>
                            </Row>
                            <Row><TabRouter routes={modules.routes}/></Row>
                        </Authenticated>
                        <Authenticated no>
                            <LoginForm />
                        </Authenticated>
                        <FlashMessages/>
                    </Grid>
                </ConnectedRouter>
            </Provider>
        </DragDropContextProvider>
    </AppContainer>;
