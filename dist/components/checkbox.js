"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _templateObject = _taggedTemplateLiteral(["\n  width: 20px;\n  height: 20px;\n  position: relative;\n  user-select: none;\n  background: ", ";\n  display: inline-block;\n"], ["\n  width: 20px;\n  height: 20px;\n  position: relative;\n  user-select: none;\n  background: ", ";\n  display: inline-block;\n"]),_templateObject2 = _taggedTemplateLiteral(["\n  visibility: hidden;\n  &:checked + label:after {\n    opacity: 1 !important;\n  }\n"], ["\n  visibility: hidden;\n  &:checked + label:after {\n    opacity: 1 !important;\n  }\n"]),_templateObject3 = _taggedTemplateLiteral(["\n  cursor: pointer\n  position: absolute\n  top: 2px;\n  right: 2px;\n  bottom: 2px;\n  left: 2px;\n  background-color: white;\n  &:after {\n    content: '';\n    position: absolute;\n    top: 3px;\n    right: 2px;\n    bottom: 7px;\n    left: 2px;\n    border: 2px solid black;\n    border-top: none;\n    border-right: none;\n    opacity: 0;\n    transform: rotate(-45deg) translateZ(0);\n    transition: opacity 0.25s;\n  }\n"], ["\n  cursor: pointer\n  position: absolute\n  top: 2px;\n  right: 2px;\n  bottom: 2px;\n  left: 2px;\n  background-color: white;\n  &:after {\n    content: '';\n    position: absolute;\n    top: 3px;\n    right: 2px;\n    bottom: 7px;\n    left: 2px;\n    border: 2px solid black;\n    border-top: none;\n    border-right: none;\n    opacity: 0;\n    transform: rotate(-45deg) translateZ(0);\n    transition: opacity 0.25s;\n  }\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var React = require("react");
var styled_components_1 = require("styled-components");
var colors_1 = require("../assets/colors");var
Checkbox = function (_React$Component) {_inherits(Checkbox, _React$Component);function Checkbox() {_classCallCheck(this, Checkbox);return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));}_createClass(Checkbox, [{ key: "render", value: function render()
    {var
      checked = this.props.checked;
      return React.createElement("div", { className: this.props.className },
      React.createElement(CheckboxInput, { type: "checkbox", checked: checked }),
      React.createElement(Label, null));
    } }]);return Checkbox;}(React.Component);

Checkbox.defaultProps = {
  checked: true };

exports.Checkbox = Checkbox;
var StyledCheckbox = styled_components_1.default(Checkbox)(_templateObject,




colors_1.default.grayMedium);


var CheckboxInput = styled_components_1.default.input(_templateObject2);





var Label = styled_components_1.default.label(_templateObject3);






















Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StyledCheckbox;
//# sourceMappingURL=checkbox.js.map
