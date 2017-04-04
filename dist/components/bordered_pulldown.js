"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _templateObject = _taggedTemplateLiteral(["\n  ", "\n  display: inline-block;\n  width: 200px;\n  position :relative;\n  border: 2px solid ", ";\n  text-align: left;\n  font-size: 17px;\n  &:hover > .bordered-pulldown-options {\n    display: block;\n    border-color: gray-color;\n  }\n  &.is-disabled {\n    .bordered-pulldown-toggle {\n      cursor: default;\n      color: ", ";\n    }\n  }\n"], ["\n  ", "\n  display: inline-block;\n  width: 200px;\n  position :relative;\n  border: 2px solid ", ";\n  text-align: left;\n  font-size: 17px;\n  &:hover > .bordered-pulldown-options {\n    display: block;\n    border-color: gray-color;\n  }\n  &.is-disabled {\n    .bordered-pulldown-toggle {\n      cursor: default;\n      color: ", ";\n    }\n  }\n"]),_templateObject2 = _taggedTemplateLiteral(["\n  display: block;\n  padding: 8px 10px 6px;\n  text-decoration: none;\n"], ["\n  display: block;\n  padding: 8px 10px 6px;\n  text-decoration: none;\n"]),_templateObject3 = _taggedTemplateLiteral(["\n  float: right;\n  padding-left: 5px;\n  border-left: 1px solid ", ";\n"], ["\n  float: right;\n  padding-left: 5px;\n  border-left: 1px solid ", ";\n"]),_templateObject4 = _taggedTemplateLiteral(["\n  display: none;\n  position: absolute;\n  background: white;\n  border: 2px solid ", ";\n  top: -2px;\n  left: -2px;\n  right: -2px;\n  z-index: 2;\n  > a {\n    text-decoration: none;\n    overflow: ellipsis;\n    display: block;\n    padding: 8px 10px 6px;\n    text-decoration: none;\n    cursor: pointer;\n    &:hover {\n      background-color: ", ";\n    } \n  } \n"], ["\n  display: none;\n  position: absolute;\n  background: white;\n  border: 2px solid ", ";\n  top: -2px;\n  left: -2px;\n  right: -2px;\n  z-index: 2;\n  > a {\n    text-decoration: none;\n    overflow: ellipsis;\n    display: block;\n    padding: 8px 10px 6px;\n    text-decoration: none;\n    cursor: pointer;\n    &:hover {\n      background-color: ", ";\n    } \n  } \n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var React = require("react");
var icon_1 = require("./icon");
var styled_components_1 = require("styled-components");
var colors_1 = require("../assets/colors");
var fonts_1 = require("../assets/fonts");var
BorderedPulldown = function (_React$Component) {_inherits(BorderedPulldown, _React$Component);
  function BorderedPulldown(props) {_classCallCheck(this, BorderedPulldown);var _this = _possibleConstructorReturn(this, (BorderedPulldown.__proto__ || Object.getPrototypeOf(BorderedPulldown)).call(this,
    props));
    _this.state = {
      selected: null,
      isHovered: false };return _this;

  }_createClass(BorderedPulldown, [{ key: "onChange", value: function onChange(
    option) {
      this.setState({
        selected: option });

      this.props.onChange(option);
    } }, { key: "render", value: function render()
    {var _this2 = this;var _props =
      this.props,options = _props.options,defaultValue = _props.defaultValue;
      var optionEls = options.map(function (option) {
        return React.createElement("a", { key: option.val, onClick: function onClick() {return _this2.onChange(option);} }, option.name);
      });
      var displayValue = this.state.selected && this.state.selected.name || defaultValue;
      return React.createElement("div", { className: this.props.className },
      React.createElement(Toggle, null,
      React.createElement("span", null, displayValue),
      React.createElement(CaretHolder, null,
      React.createElement(icon_1.default, { name: "arrow-down", fontSize: "9px", color: colors_1.default.grayMedium }))),
      React.createElement(PulldownOptions, { className: "bordered-pulldown-options" }, optionEls));
    } }]);return BorderedPulldown;}(React.Component);

exports.BorderedPulldown = BorderedPulldown;
var StyledBorderedPulldown = styled_components_1.default(BorderedPulldown)(_templateObject,
fonts_1.secondary.style,



colors_1.default.grayMedium,









colors_1.default.grayBold);



var Toggle = styled_components_1.default.div(_templateObject2);




var CaretHolder = styled_components_1.default.div(_templateObject3,


colors_1.default.grayMedium);

var PulldownOptions = styled_components_1.default.div(_templateObject4,



colors_1.default.grayMedium,












colors_1.default.gray);



Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StyledBorderedPulldown;
//# sourceMappingURL=bordered_pulldown.js.map
