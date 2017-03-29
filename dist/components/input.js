"use strict";var _templateObject = _taggedTemplateLiteral(["\n  ", "\n  ", "\n"], ["\n  ", "\n  ", "\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
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
var helpers_1 = require("./helpers");
var mixins_1 = require("./mixins");
var Input = function Input(props) {return React.createElement("input", __assign({}, props));};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = styled_components_1.default(Input)(_templateObject,
mixins_1.borderedInput,
helpers_1.block(24));
//# sourceMappingURL=input.js.map
