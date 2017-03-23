"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _templateObject = _taggedTemplateLiteral(["\n  font-size: 15px;\n  line-height: 12px;\n  color: ", ";\n  text-decoration: ", "\n"], ["\n  font-size: 15px;\n  line-height: 12px;\n  color: ", ";\n  text-decoration: ", "\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var React = require("react");
var styled_components_1 = require("styled-components");
var colors_1 = require("../assets/colors");
require("../assets/fonts");var
TextLink = function (_React$Component) {_inherits(TextLink, _React$Component);function TextLink() {_classCallCheck(this, TextLink);return _possibleConstructorReturn(this, (TextLink.__proto__ || Object.getPrototypeOf(TextLink)).apply(this, arguments));}_createClass(TextLink, [{ key: "render", value: function render()
        {
            return React.createElement("a", { href: this.props.href, className: this.props.className }, this.props.children);
        } }]);return TextLink;}(React.Component);

exports.TextLink = TextLink;
TextLink.defaultProps = {
    underline: false };

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = styled_components_1.default(TextLink)(_templateObject,


colors_1.default.grayBold,
function (props) {return props.underline ? "underline" : "none";});
//# sourceMappingURL=text_link.js.map
