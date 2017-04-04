"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _templateObject = _taggedTemplateLiteral(["\n  position: relative;\n"], ["\n  position: relative;\n"]),_templateObject2 = _taggedTemplateLiteral(["\n  height: ", "; \n  width: ", ";\n  overflow: hidden;\n"], ["\n  height: ", "; \n  width: ", ";\n  overflow: hidden;\n"]),_templateObject3 = _taggedTemplateLiteral(["\n  display: table;\n  width: 100%;\n  height: 100%;\n"], ["\n  display: table;\n  width: 100%;\n  height: 100%;\n"]),_templateObject4 = _taggedTemplateLiteral(["\n  display: table-cell;\n  vertical-align: middle;\n  width: 100%;\n  height: 100%;\n  text-align: center;\n"], ["\n  display: table-cell;\n  vertical-align: middle;\n  width: 100%;\n  height: 100%;\n  text-align: center;\n"]),_templateObject5 = _taggedTemplateLiteral(["\n  max-width: 100%;\n  max-height: ", ";\n  margin: auto;\n"], ["\n  max-width: 100%;\n  max-height: ", ";\n  margin: auto;\n"]),_templateObject6 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  height: ", ";\n  width: ", ";\n  position: absolute;\n  z-index: 10;\n  top: 0;\n  left: 0;\n  opacity: 0.8;\n  text-align: center;\n  line-height: ", ";\n  pointer-events: none;\n"], ["\n  background-color: ", ";\n  height: ", ";\n  width: ", ";\n  position: absolute;\n  z-index: 10;\n  top: 0;\n  left: 0;\n  opacity: 0.8;\n  text-align: center;\n  line-height: ", ";\n  pointer-events: none;\n"]);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
var React = require("react");
var Relay = require("react-relay");
var styled_components_1 = require("styled-components");
var colors_1 = require("../../assets/colors");
var icon_1 = require("../icon");
var metadata_1 = require("./metadata");
var defaultHeight = "350px";
var defaultWidth = "350px";
var InquiryArtworkBrick = styled_components_1.default.div(_templateObject);


var ImageContainer = styled_components_1.default.div(_templateObject2,
defaultHeight,
defaultWidth);


var ImageOuterContainer = styled_components_1.default.div(_templateObject3);




var ImageInnerContainer = styled_components_1.default.div(_templateObject4);






var Image = styled_components_1.default.img(_templateObject5,

defaultHeight);


var SelectedArtworkOverlay = styled_components_1.default.div(_templateObject6,
colors_1.default.purpleRegular,
defaultHeight,
defaultWidth,






defaultHeight);var


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
            var selectedOverlay = void 0;
            if (this.state.isSelected) {
                selectedOverlay = React.createElement(SelectedArtworkOverlay, null,
                React.createElement(icon_1.default, { name: "check", color: "white" }));
            }
            return React.createElement(InquiryArtworkBrick, null,
            React.createElement(ImageContainer, null,
            React.createElement(ImageOuterContainer, { onClick: this.onSelect.bind(this) },
            React.createElement(ImageInnerContainer, null,
            React.createElement(Image, { src: this.props.artwork.image.url })))),
            React.createElement(metadata_1.default, { artwork: this.props.artwork }),
            selectedOverlay);
        } }]);return Artwork;}(React.Component);

exports.Artwork = Artwork;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Relay.createContainer(Artwork, {
    fragments: {
        artwork: function artwork() {return function (RQL_0) {return { children: [].concat.apply([], [{ children: [{ calls: [{ kind: "Call", metadata: {}, name: "version", value: { kind: "CallValue", callValue: "large" } }], fieldName: "url", kind: "Field", metadata: {}, type: "String" }], fieldName: "image", kind: "Field", metadata: { canHaveSubselections: true }, type: "Image" }, { fieldName: "__id", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "ID" }, Relay.QL.__frag(RQL_0)]), id: Relay.QL.__id(), kind: "Fragment", metadata: {}, name: "Index_ArtworkRelayQL", type: "Artwork" };}(




            metadata_1.default.getFragment("artwork"));} } });
//# sourceMappingURL=index.js.map
