/* global document */

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import {ConnectedRouter} from 'react-router-redux';
import createBrowserHistory from "history/createBrowserHistory";
import { Provider } from 'react-redux';
import {Grid, Row} from "react-bootstrap";
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import defaults from "../config/defaults";
import config from 'atp-config';
config.setValues(defaults);

import {o} from "atp-sugar";

//--Module definitions--
import comic from "atp-comic";
import entity from "atp-redux-entity";
import flash from "atp-flash";
import homepage from "home/module";
import media from "atp-media";
import uac from "atp-uac";
import ui from "atp-ui";
import inlineEdit from "atp-inline-edit";
import tree from 'atp-tree';
import tabRouter from 'atp-react-tab-router';

const modules = [
    comic, entity, flash, homepage, inlineEdit, media, uac, ui, tree, tabRouter
].reduce((joined, module) => joined.merge(module), o({})).raw;

import {Navbar} from "atp-ui";
import {TabPanel} from "atp-ui";
import {Authenticated} from "atp-uac";
import {LoginForm} from "atp-uac";
import {FlashMessages} from "atp-flash";
import {TabRouter} from 'atp-react-tab-router';
import {Route} from 'react-router';

import createStore from 'redux/store';

const history = createBrowserHistory();

render(
    <DragDropContextProvider backend={HTML5Backend}>
        <Provider store={createStore(modules.reducers, modules.init, history)}>
            <ConnectedRouter history={history}>
                <Grid fluid={true}>
                    <Authenticated yes>
                        <Row>
                            <Navbar title={"ATP Admin!"} leftMenu="main" rightMenu="altMain"/>
                        </Row>
                        <Row><TabRouter routes={modules.routes}/></Row>
                        <Row><TabPanel/></Row>
                    </Authenticated>
                    <Authenticated no>
                        <LoginForm />
                    </Authenticated>
                    <FlashMessages/>
                </Grid>
            </ConnectedRouter>
        </Provider>
    </DragDropContextProvider>,
    document.getElementById('react')
);
