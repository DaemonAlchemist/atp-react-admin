/* global document */
import 'react-hot-loader/patch';

import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';

var App = require("./app").default;

const refresh = () => {
    render(
        <App/>,
        document.getElementById('react')
    );
};
refresh();

if(module.hot) {
    module.hot.accept("./app", () => {
        App = require("./app").default;
        refresh();
    });
}
