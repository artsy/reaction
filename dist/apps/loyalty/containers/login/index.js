"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _templateObject = _taggedTemplateLiteral(["\n  padding: 20px;\n  max-width: 350px;\n  margin: 0 auto;\n  align-text: center;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n"], ["\n  padding: 20px;\n  max-width: 350px;\n  margin: 0 auto;\n  align-text: center;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n"]),_templateObject2 = _taggedTemplateLiteral(["\n  margin: 5px 0;\n  width: 100%;\n"], ["\n  margin: 5px 0;\n  width: 100%;\n"]);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
var React = require("react");
var styled_components_1 = require("styled-components");
var facebook_1 = require("../../../../components/buttons/facebook");
var inverted_1 = require("../../../../components/buttons/inverted");
var twitter_1 = require("../../../../components/buttons/twitter");
var icon_1 = require("../../../../components/icon");
var input_1 = require("../../../../components/input");
var text_1 = require("../../../../components/text");
var text_link_1 = require("../../../../components/text_link");
var LoginContainer = styled_components_1.default.div(_templateObject);








var StyledInput = styled_components_1.default(input_1.default)(_templateObject2);var



Login = function (_React$Component) {_inherits(Login, _React$Component);function Login() {_classCallCheck(this, Login);return _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).apply(this, arguments));}_createClass(Login, [{ key: "render", value: function render()
        {
            var form = this.props.form || { url: "/login" };
            return React.createElement(LoginContainer, null,
            React.createElement(icon_1.default, { name: "logotype", color: "black", fontSize: "30px" }),
            React.createElement(text_1.default, { textSize: "large", align: "center" },
            "Welcome back, please log in ",
            React.createElement("br", null),
            " to your account."),
            React.createElement("form", { action: form.url, method: "POST", onSubmit: this.props.onSubmit },
            React.createElement(StyledInput, { name: "email", placeholder: "Email", block: true }),
            React.createElement(StyledInput, { name: "password", placeholder: "Password", type: "password", block: true }),
            form.csrfToken && React.createElement("input", { type: "hidden", name: "_csrf", value: form.csrfToken }),
            React.createElement(inverted_1.default, { block: true }, "Log In"),
            React.createElement("div", { style: { textAlign: "center" } }, "or"),
            React.createElement(facebook_1.default, { href: form.facebookPath, block: true }),
            React.createElement(twitter_1.default, { href: form.twitterPath, block: true })),
            React.createElement("br", null),
            React.createElement(text_1.default, { align: "center" },
            React.createElement("span", null, "Don't have an account? "),
            React.createElement(text_link_1.default, { underline: true }, "Sign Up")));
        } }]);return Login;}(React.Component);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login;
//# sourceMappingURL=index.js.map
