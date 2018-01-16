import React from 'react';
import {Grid, Row} from "react-bootstrap";

import {Navbar} from "atp-ui";
import {Authenticated} from "atp-uac";
import {LoginForm} from "atp-uac";
import {FlashMessages} from "atp-flash";
import {TabRouter} from 'atp-react-tab-router';

export default ({modules}) =>
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
    </Grid>;
