"use strict";
var React = require("react");
var react_router_1 = require("react-router");
var auth = require("./auth");
var app_1 = require("./app");
var inquiries_1 = require("./containers/inquiries");
var login_1 = require("./containers/login");
function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({
            pathname: "/login",
            state: { nextPathname: nextState.location.pathname },
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (React.createElement(react_router_1.Route, { path: "/", component: app_1.default },
    React.createElement(react_router_1.IndexRoute, { component: inquiries_1.default, onEnter: requireAuth }),
    React.createElement(react_router_1.Route, { path: "login", component: login_1.default }),
    React.createElement(react_router_1.Route, { path: "inquiries", component: inquiries_1.default, onEnter: requireAuth })));

//# sourceMappingURL=routes.js.map
