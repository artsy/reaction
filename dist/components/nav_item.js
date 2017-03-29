"use strict";var _templateObject = _taggedTemplateLiteral(["\n  align-self: center;\n  font-family: ", ";\n  font-size: 14px;\n  line-height: 12px;\n  text-decoration: none;\n  color: black;\n  text-transform: uppercase;\n  -webkit-font-smoothing: antialiased;\n  letter-spacing: 0.8;\n"], ["\n  align-self: center;\n  font-family: ", ";\n  font-size: 14px;\n  line-height: 12px;\n  text-decoration: none;\n  color: black;\n  text-transform: uppercase;\n  -webkit-font-smoothing: antialiased;\n  letter-spacing: 0.8;\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
var React = require("react");
var styled_components_1 = require("styled-components");
var fonts = require("../assets/fonts");
var StyledLink = styled_components_1.default.a(_templateObject,

fonts.primary.fontFamily);








var NavItem = function NavItem(props) {return React.createElement(StyledLink, { href: props.href }, props.children);};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NavItem;
//# sourceMappingURL=nav_item.js.map
