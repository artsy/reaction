"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _templateObject = _taggedTemplateLiteral(["\n  margin-right: 15px\n"], ["\n  margin-right: 15px\n"]),_templateObject2 = _taggedTemplateLiteral(["\n  display: inline-block;\n  border: 1px solid ", ";\n  font-size: 13px;\n  line-height: 160%;\n  padding: 15px 18px 10px 18px;\n  font-size: 13px;\n  vertical-align: middle;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  ", "\n"], ["\n  display: inline-block;\n  border: 1px solid ", ";\n  font-size: 13px;\n  line-height: 160%;\n  padding: 15px 18px 10px 18px;\n  font-size: 13px;\n  vertical-align: middle;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  ", "\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var React = require("react");
var checkbox_1 = require("../checkbox");
var styled_components_1 = require("styled-components");
var colors_1 = require("../../assets/colors");
var fonts_1 = require("../../assets/fonts");var
ForSaleCheckbox = function (_React$Component) {_inherits(ForSaleCheckbox, _React$Component);
    function ForSaleCheckbox(props) {_classCallCheck(this, ForSaleCheckbox);var _this = _possibleConstructorReturn(this, (ForSaleCheckbox.__proto__ || Object.getPrototypeOf(ForSaleCheckbox)).call(this,
        props));
        _this.state = {
            isChecked: false };return _this;

    }_createClass(ForSaleCheckbox, [{ key: "onClick", value: function onClick()
        {
            this.setState({
                isChecked: !this.state.isChecked });

            this.props.onClick();
        } }, { key: "render", value: function render()
        {var _this2 = this;var
            isChecked = this.state.isChecked;
            return React.createElement("div", { className: this.props.className, onClick: function onClick() {return _this2.onClick();} },
            React.createElement(StyledCheckbox, { checked: isChecked }),
            React.createElement("label", null, "Only for Sale"));
        } }]);return ForSaleCheckbox;}(React.Component);

exports.ForSaleCheckbox = ForSaleCheckbox;
var StyledCheckbox = styled_components_1.default(checkbox_1.default)(_templateObject);


var StyledForSaleCheckbox = styled_components_1.default(ForSaleCheckbox)(_templateObject2,

colors_1.default.grayRegular,








fonts_1.primary.style);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StyledForSaleCheckbox;
//# sourceMappingURL=for_sale_checkbox.js.map
