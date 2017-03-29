"use strict";var _templateObject = _taggedTemplateLiteral(["\n  font-family: ", ";\n  color: ", ";\n  font-size: ", ";\n  margin: 0 5px;\n  display: inline-block;\n"], ["\n  font-family: ", ";\n  color: ", ";\n  font-size: ", ";\n  margin: 0 5px;\n  display: inline-block;\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
var React = require("react");
var styled_components_1 = require("styled-components");
require("../assets/fonts");
var icons_1 = require("../assets/icons");
var Icon = function Icon(props) {return React.createElement("div", { className: props.className, style: props.style }, icons_1.default[props.name]);};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = styled_components_1.default(Icon)(_templateObject,
function (props) {return props.font || "artsy-icons";},
function (props) {return props.color || "purple";},
function (props) {return props.fontSize || "24px";});
//# sourceMappingURL=icon.js.map
