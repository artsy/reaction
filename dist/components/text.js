"use strict";var _templateObject = _taggedTemplateLiteral(["\n  font-size: ", ";\n  text-align: ", ";\n  color: ", ";\n  ", ";\n"], ["\n  font-size: ", ";\n  text-align: ", ";\n  color: ", ";\n  ", ";\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
var React = require("react");
var styled_components_1 = require("styled-components");
var fonts = require("../assets/fonts");
var textSizes = {
    small: "17px",
    large: "20px" };

var Text = function Text(props) {return React.createElement("p", { className: props.className }, props.children);};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = styled_components_1.default(Text)(_templateObject,
function (props) {return textSizes[props.textSize];},
function (props) {return props.align;},
function (props) {return props.color;},
fonts.secondary.style);

Text.defaultProps = {
    textSize: "small",
    align: "start",
    color: "currentcolor" };
//# sourceMappingURL=text.js.map
