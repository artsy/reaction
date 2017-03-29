"use strict";var _templateObject = _taggedTemplateLiteral(["\n  background: #39439C;\n  color: white;\n  height: 40px;\n  padding: 0 30px;\n  margin: 10px auto 2px;\n\n  &:hover:not(:disabled) {\n    background: #252C68;\n  }\n"], ["\n  background: #39439C;\n  color: white;\n  height: 40px;\n  padding: 0 30px;\n  margin: 10px auto 2px;\n\n  &:hover:not(:disabled) {\n    background: #252C68;\n  }\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];}
    }
    return t;
};
var React = require("react");
var styled_components_1 = require("styled-components");
var icon_1 = require("../icon");
var default_1 = require("./default");
var FacebookButton = function FacebookButton(props) {
    var icon = React.createElement(icon_1.default, { name: "facebook", color: "white" });
    return React.createElement(default_1.default, __assign({}, props, { icon: icon }), "Log in with Facebook");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = styled_components_1.default(FacebookButton)(_templateObject);
//# sourceMappingURL=facebook.js.map
