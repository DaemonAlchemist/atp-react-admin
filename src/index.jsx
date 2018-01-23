
import 'react-hot-loader/patch';

import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';

//Using require(...) instead of import so that hot reloading works ("import"ed modules are immutable)
var App = require("./app/app").default;
var AppContainer = require("./app-container").default;

const refresh = () => {
    render(
        <AppContainer App={App} />,
        document.getElementById('react')
    );
};
refresh();

if(module.hot) {
    module.hot.accept("./app/app", () => {
        App = require("./app/app").default;
        refresh();
    });
    module.hot.accept("./app-container", () => {
        AppContainer = require("./app-container").default;
        refresh();
    });
}
