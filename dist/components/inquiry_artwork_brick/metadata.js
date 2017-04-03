"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _templateObject = _taggedTemplateLiteral(["\n    ", "\n    color: ", ";\n    font-size: 15px;\n    height: 100px;\n"], ["\n    ", "\n    color: ", ";\n    font-size: 15px;\n    height: 100px;\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var React = require("react");
var Relay = require("react-relay");
var styled_components_1 = require("styled-components");
var colors_1 = require("../../assets/colors");
var fonts = require("../../assets/fonts");
var details_1 = require("./details");var
ArtworkMetadata = function (_React$Component) {_inherits(ArtworkMetadata, _React$Component);function ArtworkMetadata() {_classCallCheck(this, ArtworkMetadata);return _possibleConstructorReturn(this, (ArtworkMetadata.__proto__ || Object.getPrototypeOf(ArtworkMetadata)).apply(this, arguments));}_createClass(ArtworkMetadata, [{ key: "render", value: function render()
        {
            return React.createElement("div", { className: this.props.className },
            React.createElement(details_1.default, { artwork: this.props.artwork }));
        } }]);return ArtworkMetadata;}(React.Component);

exports.ArtworkMetadata = ArtworkMetadata;
exports.StyledMetadata = styled_components_1.default(ArtworkMetadata)(_templateObject,
fonts.secondary.style,
colors_1.default.grayBold);



Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Relay.createContainer(exports.StyledMetadata, {
    fragments: {
        artwork: function artwork() {return function (RQL_0) {return { children: [].concat.apply([], [{ fieldName: "__id", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "ID" }, Relay.QL.__frag(RQL_0)]), id: Relay.QL.__id(), kind: "Fragment", metadata: {}, name: "Metadata_ArtworkRelayQL", type: "Artwork" };}(

            details_1.default.getFragment("artwork"));} } });
//# sourceMappingURL=metadata.js.map
