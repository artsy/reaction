"use strict";
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var session = require("express-session");
var path = require("path");
var React = require("react");
var server_1 = require("react-dom/server");
var styleSheet = require("styled-components/lib/models/StyleSheet");
var template_1 = require("./template");
var inquiries_1 = require("../containers/inquiries");
var login_1 = require("../containers/login");
var current_user_1 = require("./current_user");
var app = express();
var artsyPassport = require("artsy-passport");
app.use(express.static(path.resolve(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.ARTSY_SECRET,
    cookie: {} }));

app.use(artsyPassport(Object.assign({}, process.env, {
    CurrentUser: current_user_1.default,
    loginPagePath: "/login" })));var _artsyPassport$option =

artsyPassport.options,loginPagePath = _artsyPassport$option.loginPagePath,facebookPath = _artsyPassport$option.facebookPath,twitterPath = _artsyPassport$option.twitterPath;
app.get("/", function (req, res) {
    res.redirect(req.baseUrl + "/inquiries");
});
app.get(loginPagePath, function (req, res) {
    var formConfig = {
        url: req.baseUrl + req.path,
        csrfToken: req.csrfToken(),
        facebookPath: facebookPath,
        twitterPath: twitterPath };

    var html = server_1.renderToString(React.createElement(login_1.default, { form: formConfig }));
    var styles = styleSheet.rules().map(function (rule) {return rule.cssText;}).join("\n");
    res.send(template_1.default({
        styles: styles,
        html: html,
        entrypoint: "/bundles/login.js" }));

});
app.get("/inquiries", function (req, res) {
    if (!req.user) {
        return res.redirect(req.baseUrl + "/login");
    }
    var html = server_1.renderToString(React.createElement(inquiries_1.default, null));
    var styles = styleSheet.rules().map(function (rule) {return rule.cssText;}).join("\n");
    res.send(template_1.default({
        styles: styles,
        html: html,
        entrypoint: "/bundles/inquiries.js" }));

});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
//# sourceMappingURL=index.js.map
