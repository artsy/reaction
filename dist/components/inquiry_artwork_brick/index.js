"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _templateObject = _taggedTemplateLiteral(["\n  width: 100%;\n  align-self: center;\n"], ["\n  width: 100%;\n  align-self: center;\n"]),_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  height: 300px;\n  z-index: 9;\n  position: relative;\n"], ["\n  display: flex;\n  height: 300px;\n  z-index: 9;\n  position: relative;\n"]),_templateObject3 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  height: 300px;\n  position: absolute;\n  z-index: 10;\n  top: 0;\n  left: 0;\n  width: 100%;\n  opacity: 0.8;\n"], ["\n  background-color: ", ";\n  height: 300px;\n  position: absolute;\n  z-index: 10;\n  top: 0;\n  left: 0;\n  width: 100%;\n  opacity: 0.8;\n"]);function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
var React = require("react");
var Relay = require("react-relay");
var styled_components_1 = require("styled-components");
var metadata_1 = require("./metadata");
var colors_1 = require("../../assets/colors");
var icon_1 = require("../icon");
var Image = styled_components_1.default.img(_templateObject);



var ImageOuterContainer = styled_components_1.default.div(_templateObject2);





var SelectedArtworkOverlay = styled_components_1.default.div(_templateObject3,
colors_1.default.purpleRegular);var








ArtworkState = function ArtworkState() {_classCallCheck(this, ArtworkState);};

exports.ArtworkState = ArtworkState;var
Artwork = function (_React$Component) {_inherits(Artwork, _React$Component);
    function Artwork(props) {_classCallCheck(this, Artwork);var _this = _possibleConstructorReturn(this, (Artwork.__proto__ || Object.getPrototypeOf(Artwork)).call(this,
        props));
        _this.state = {
            isSelected: false };return _this;

    }_createClass(Artwork, [{ key: "onSelect", value: function onSelect()
        {
            this.setState({
                isSelected: !this.state.isSelected });

        } }, { key: "render", value: function render()
        {
            return React.createElement("div", { style: { position: "relative" } },
            React.createElement(ImageOuterContainer, { onClick: this.onSelect.bind(this) },
            React.createElement(Image, { src: this.props.artwork.image.url })),
            React.createElement(metadata_1.default, { artwork: this.props.artwork }),
            this.state.isSelected && React.createElement(SelectedArtworkOverlay, { onClick: this.onSelect.bind(this) },
            React.createElement(icon_1.default, { name: "check", color: "black" })));
        } }]);return Artwork;}(React.Component);

exports.Artwork = Artwork;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Relay.createContainer(Artwork, {
    fragments: {
        artwork: function artwork() {return function (RQL_0) {return { children: [].concat.apply([], [{ children: [{ calls: [{ kind: "Call", metadata: {}, name: "version", value: { kind: "CallValue", callValue: "large" } }], fieldName: "url", kind: "Field", metadata: {}, type: "String" }, { fieldName: "aspect_ratio", kind: "Field", metadata: {}, type: "Float" }], fieldName: "image", kind: "Field", metadata: { canHaveSubselections: true }, type: "Image" }, { fieldName: "__id", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "ID" }, Relay.QL.__frag(RQL_0)]), id: Relay.QL.__id(), kind: "Fragment", metadata: {}, name: "Index_ArtworkRelayQL", type: "Artwork" };}(





            metadata_1.default.getFragment("artwork"));} } });
//# sourceMappingURL=index.js.map
