"use strict";var _templateObject = _taggedTemplateLiteral(["\n  border-bottom: 1px solid ", ";\n  display: flex;\n"], ["\n  border-bottom: 1px solid ", ";\n  display: flex;\n"]),_templateObject2 = _taggedTemplateLiteral(["\n  border-right: 1px solid ", ";\n  display: inline-block;\n  font-size: 32px;\n  padding: 10px 5px;\n  margin-right: 10px;\n"], ["\n  border-right: 1px solid ", ";\n  display: inline-block;\n  font-size: 32px;\n  padding: 10px 5px;\n  margin-right: 10px;\n"]),_templateObject3 = _taggedTemplateLiteral(["\n  body {\n    margin: 0;\n  }\n"], ["\n  body {\n    margin: 0;\n  }\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
var React = require("react");
var styled_components_1 = require("styled-components");
var colors_1 = require("../assets/colors");
var icon_1 = require("./icon");
var Nav = styled_components_1.default.div(_templateObject,
colors_1.default.grayRegular);


var NavIcon = styled_components_1.default.div(_templateObject2,
colors_1.default.grayRegular);





styled_components_1.injectGlobal(_templateObject3);




var NavBar = function NavBar(props) {return React.createElement(Nav, null,
  React.createElement(NavIcon, null,
  React.createElement(icon_1.default, { name: "logo", color: "black", fontSize: "32px" })),
  props.children);};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NavBar;
//# sourceMappingURL=nav.js.map
