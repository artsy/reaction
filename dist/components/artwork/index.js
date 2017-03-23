"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _templateObject = _taggedTemplateLiteral(["\n  width: 100%;\n"], ["\n  width: 100%;\n"]);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
var React = require("react");
var Relay = require("react-relay");
var styled_components_1 = require("styled-components");
var metadata_1 = require("./metadata");
var Image = styled_components_1.default.img(_templateObject);var


Artwork = function (_React$Component) {_inherits(Artwork, _React$Component);function Artwork() {_classCallCheck(this, Artwork);return _possibleConstructorReturn(this, (Artwork.__proto__ || Object.getPrototypeOf(Artwork)).apply(this, arguments));}_createClass(Artwork, [{ key: "render", value: function render()
    {
      return React.createElement("div", null,
      React.createElement(Image, { src: this.props.artwork.image.url }),
      React.createElement(metadata_1.default, { artwork: this.props.artwork }));
    } }]);return Artwork;}(React.Component);

exports.Artwork = Artwork;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Relay.createContainer(Artwork, {
  fragments: {
    artwork: function artwork() {return function (RQL_0) {return { children: [].concat.apply([], [{ children: [{ calls: [{ kind: "Call", metadata: {}, name: "version", value: { kind: "CallValue", callValue: "large" } }], fieldName: "url", kind: "Field", metadata: {}, type: "String" }, { fieldName: "aspect_ratio", kind: "Field", metadata: {}, type: "Float" }], fieldName: "image", kind: "Field", metadata: { canHaveSubselections: true }, type: "Image" }, { fieldName: "__id", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "ID" }, Relay.QL.__frag(RQL_0)]), id: Relay.QL.__id(), kind: "Fragment", metadata: {}, name: "Index_ArtworkRelayQL", type: "Artwork" };}(





      metadata_1.default.getFragment("artwork"));} } });
//# sourceMappingURL=index.js.map
