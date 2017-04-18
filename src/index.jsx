/* global document */

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {Grid, Row} from "react-bootstrap";

import {o} from "atp-sugar";

//--Module definitions--
import comic from "atp-comic";
import entity from "atp-entity";
import flash from "atp-flash";
import homepage from "home/module";
import uac from "atp-uac";
import ui from "atp-ui";
import inlineEdit from "atp-inline-edit";

const modules = [
    comic, entity, flash, homepage, inlineEdit, uac, ui
].reduce((joined, module) => joined.merge(module), o({})).raw;

import {Navbar} from "atp-ui";
import {TabPanel} from "atp-ui";
import {Authenticated} from "atp-uac";
import {LoginForm} from "atp-uac";
import {FlashMessages} from "atp-flash";

import createStore from 'redux/store';

render(
    <Provider store={createStore(modules.reducers, modules.init)}>
        <Grid fluid={true}>
            <Authenticated yes>
                <Row>
                    <Navbar title={"ATP Admin!"} leftMenu="main" rightMenu="altMain"/>
                </Row>
                <Row><TabPanel/></Row>
            </Authenticated>
            <Authenticated no>
                <LoginForm />
            </Authenticated>
            <FlashMessages/>
        </Grid>
    </Provider>,
    document.getElementById('react')
);
