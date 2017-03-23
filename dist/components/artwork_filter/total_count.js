"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _templateObject = _taggedTemplateLiteral(["\n  font-style: italic;\n  ", "\n"], ["\n  font-style: italic;\n  ", "\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var React = require("react");
var Relay = require("react-relay");
var styled_components_1 = require("styled-components");
var fonts_1 = require("../../assets/fonts");var
TotalCount = function (_React$Component) {_inherits(TotalCount, _React$Component);function TotalCount() {_classCallCheck(this, TotalCount);return _possibleConstructorReturn(this, (TotalCount.__proto__ || Object.getPrototypeOf(TotalCount)).apply(this, arguments));}_createClass(TotalCount, [{ key: "render", value: function render()
    {
      var total = this.props.filter_artworks.counts.total;
      var s = total !== 1 ? "s" : "";
      return React.createElement("div", { className: this.props.className },
      total,
      " Work",
      s);
    } }]);return TotalCount;}(React.Component);

exports.TotalCount = TotalCount;
var StyledTotalCount = styled_components_1.default(TotalCount)(_templateObject,

fonts_1.secondary.style);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Relay.createContainer(StyledTotalCount, {
  fragments: {
    filter_artworks: function filter_artworks() {return function () {return { children: [{ children: [{ fieldName: "total", kind: "Field", metadata: {}, type: "FormattedNumber" }], fieldName: "counts", kind: "Field", metadata: { canHaveSubselections: true }, type: "FilterArtworksCounts" }], id: Relay.QL.__id(), kind: "Fragment", metadata: {}, name: "Total_count_Filter_artworksRelayQL", type: "FilterArtworks" };}();} } });
//# sourceMappingURL=total_count.js.map
