"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _templateObject = _taggedTemplateLiteral(["\n  background: ", ";\n  color: ", ";\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 15px 30px;\n  font-size: 13px;\n  line-height: 1;\n  outline: 0;\n  transition: background-color .25s,color .25s;\n  margin: 10px;\n  border: none;\n  box-sizing: border-box;\n  text-decoration: none;\n\n  &:hover:not(:disabled) {\n    background: ", ";\n  }\n\n  ", "\n  ", "\n"], ["\n  background: ", ";\n  color: ", ";\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 15px 30px;\n  font-size: 13px;\n  line-height: 1;\n  outline: 0;\n  transition: background-color .25s,color .25s;\n  margin: 10px;\n  border: none;\n  box-sizing: border-box;\n  text-decoration: none;\n\n  &:hover:not(:disabled) {\n    background: ", ";\n  }\n\n  ", "\n  ", "\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
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
var colors_1 = require("../../assets/colors");
var fonts = require("../../assets/fonts");
var helpers_1 = require("../helpers");
var ButtonState;
(function (ButtonState) {
    ButtonState[ButtonState["Default"] = 0] = "Default";
    ButtonState[ButtonState["Loading"] = 1] = "Loading";
    ButtonState[ButtonState["Success"] = 2] = "Success";
    ButtonState[ButtonState["Failure"] = 3] = "Failure";
})(ButtonState = exports.ButtonState || (exports.ButtonState = {}));var
Button = function (_React$Component) {_inherits(Button, _React$Component);function Button() {_classCallCheck(this, Button);return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));}_createClass(Button, [{ key: "render", value: function render()
        {
            var newProps = __assign({}, this.props);
            delete newProps.state;
            delete newProps.block;
            return this.props.href ?
            React.createElement("a", __assign({ className: this.props.className }, newProps),
            this.props.icon,
            React.createElement("span", null, this.props.children)) : React.createElement("button", __assign({ className: this.props.className }, newProps),
            this.props.icon,
            React.createElement("span", null, this.props.children));
        } }]);return Button;}(React.Component);

exports.StyledButton = styled_components_1.default(Button)(_templateObject,
function (props) {
    if (props.state === ButtonState.Success)
    return colors_1.default.greenRegular;
    if (props.state === ButtonState.Failure)
    return colors_1.default.redRegular;
    return colors_1.default.grayRegular;
},
function (props) {
    if (props.disabled)
    return "rgba(0,0,0,0.5)";
    if (props.state !== ButtonState.Default)
    return "white";
    return "black";
},














function (props) {
    if (props.state === ButtonState.Success)
    return colors_1.default.greenBold;
    if (props.state === ButtonState.Failure)
    return colors_1.default.redBold;
    return colors_1.default.grayMedium;
},


fonts.primary.style,
helpers_1.block());

exports.StyledButton.defaultProps = {
    state: ButtonState.Default,
    block: false };

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.StyledButton;
//# sourceMappingURL=default.js.map
