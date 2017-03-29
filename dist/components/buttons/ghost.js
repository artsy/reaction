"use strict";var _templateObject = _taggedTemplateLiteral(["\n    background: white;\n    color: ", ";\n    border: 1px solid ", ";\n\n    &:hover:not(:disabled) {\n        background: white;\n        color: ", ";\n    }\n"], ["\n    background: white;\n    color: ", ";\n    border: 1px solid ", ";\n\n    &:hover:not(:disabled) {\n        background: white;\n        color: ", ";\n    }\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
var styled_components_1 = require("styled-components");
var colors_1 = require("../../assets/colors");
var default_1 = require("./default");
var GhostButton = styled_components_1.default(default_1.default)(_templateObject,

function (props) {return props.disabled ? "rgba(0,0,0,0.5)" : "black";},
colors_1.default.grayRegular,



colors_1.default.purpleRegular);


Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GhostButton;
//# sourceMappingURL=ghost.js.map
