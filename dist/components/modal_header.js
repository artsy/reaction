"use strict";var _templateObject = _taggedTemplateLiteral(["\n  margin: 20px auto;\n  font-size: 26px;\n  line-height: 1.3;\n  text-align: center;\n"], ["\n  margin: 20px auto;\n  font-size: 26px;\n  line-height: 1.3;\n  text-align: center;\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
var React = require("react");
var styled_components_1 = require("styled-components");
var icon_1 = require("./icon");
var Header = styled_components_1.default.header(_templateObject);





var ModalHeader = function ModalHeader(props) {return React.createElement(Header, null,
  React.createElement(icon_1.default, { name: "logotype", color: "black" }),
  props.children);};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ModalHeader;
//# sourceMappingURL=modal_header.js.map
