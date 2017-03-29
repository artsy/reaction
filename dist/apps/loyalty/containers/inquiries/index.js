"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var React = require("react");
var inverted_1 = require("../../../../components/buttons/inverted");
var nav_1 = require("../../../../components/nav");
var nav_item_1 = require("../../../../components/nav_item");
var text_area_1 = require("../../../../components/text_area");
var title_1 = require("../../../../components/title");var
Inquiries = function (_React$Component) {_inherits(Inquiries, _React$Component);function Inquiries() {_classCallCheck(this, Inquiries);return _possibleConstructorReturn(this, (Inquiries.__proto__ || Object.getPrototypeOf(Inquiries)).apply(this, arguments));}_createClass(Inquiries, [{ key: "render", value: function render()
        {
            return React.createElement("div", { style: { textAlign: "center" } },
            React.createElement(nav_1.default, null,
            React.createElement(nav_item_1.default, { href: "https://www.artsy.net" }, "Back To Artsy")),
            React.createElement(title_1.default, null, "Please select all works your purchased"),
            React.createElement("footer", { style: { maxWidth: 500, margin: "10px auto" } },
            React.createElement(title_1.default, { titleSize: "small" }, "If you purchased any works not listed above, please list them."),
            React.createElement(text_area_1.default, { block: true, placeholder: "Artwork, Artist, Gallery" }),
            React.createElement(inverted_1.default, { block: true }, "Submit purchases")));
        } }]);return Inquiries;}(React.Component);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Inquiries;
//# sourceMappingURL=index.js.map
