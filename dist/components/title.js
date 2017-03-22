"use strict";var _templateObject = _taggedTemplateLiteral(["\n  font-size: ", ";\n  margin: 20px 0;\n  ", "\n"], ["\n  font-size: ", ";\n  margin: 20px 0;\n  ", "\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
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
var fonts = require("../assets/fonts");
var titleSizes = {
    small: "25px",
    medium: "30px",
    large: "37px",
    xlarge: "50px",
    xxlarge: "72px" };

var Title = function Title(props) {
    var newProps = __assign({}, props);
    delete newProps.titleSize;
    return React.createElement("div", __assign({}, newProps), props.children);
};
var StyledTitle = styled_components_1.default(Title)(_templateObject,
function (props) {return titleSizes[props.titleSize];},

fonts.secondary.style);

StyledTitle.defaultProps = {
    titleSize: "medium" };

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StyledTitle;
//# sourceMappingURL=title.js.map
