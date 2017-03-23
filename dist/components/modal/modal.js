"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _templateObject = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  zIndex: 9999;\n  background: #fff;\n  width: 420px;\n"], ["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  zIndex: 9999;\n  background: #fff;\n  width: 420px;\n"]),_templateObject2 = _taggedTemplateLiteral(["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  zIndex: 9998;\n  background: rgba(0, 0, 0, 0.3);\n"], ["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  zIndex: 9998;\n  background: rgba(0, 0, 0, 0.3);\n"]);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
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
var ModalContainer = styled_components_1.default.div(_templateObject);








var Overlay = styled_components_1.default.div(_templateObject2);var








Modal = function (_React$Component) {_inherits(Modal, _React$Component);
    function Modal(props) {_classCallCheck(this, Modal);var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this,
        props));
        _this.close = _this.close.bind(_this);return _this;
    }_createClass(Modal, [{ key: "close", value: function close(
        e) {
            e.preventDefault();
            this.props.onClose();
        } }, { key: "render", value: function render()
        {
            var newProps = __assign({}, this.props);
            delete newProps.onClose;
            delete newProps.show;
            if (!this.props.show) {
                return null;
            }
            return React.createElement("div", null,
            React.createElement(ModalContainer, __assign({}, newProps), this.props.children),
            React.createElement(Overlay, { onClick: this.close }));
        } }]);return Modal;}(React.Component);

Modal.defaultProps = {
    show: false };

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Modal;
//# sourceMappingURL=modal.js.map
