"use strict";var _templateObject = _taggedTemplateLiteral(["\n    background: ", ";\n    color: white;\n\n    &:hover:not(:disabled) {\n        background: ", ";\n    }\n"], ["\n    background: ", ";\n    color: white;\n\n    &:hover:not(:disabled) {\n        background: ", ";\n    }\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
var styled_components_1 = require("styled-components");
var colors_1 = require("../../assets/colors");
var default_1 = require("./default");
var InvertedButton = styled_components_1.default(default_1.default)(_templateObject,
function (props) {return props.disabled ? colors_1.default.grayBold : "black";},



colors_1.default.purpleRegular);


Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InvertedButton;
//# sourceMappingURL=inverted.js.map
