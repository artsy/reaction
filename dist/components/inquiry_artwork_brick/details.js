"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _templateObject = _taggedTemplateLiteral(["\n  height: 100px;\n  margin-top: 10px;\n"], ["\n  height: 100px;\n  margin-top: 10px;\n"]);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
var React = require("react");
var Relay = require("react-relay");
var styled_components_1 = require("styled-components");
var text_link_1 = require("../text_link");
var DetailsContainer = styled_components_1.default.div(_templateObject);var



ArtworkDetails = function (_React$Component) {_inherits(ArtworkDetails, _React$Component);function ArtworkDetails() {_classCallCheck(this, ArtworkDetails);return _possibleConstructorReturn(this, (ArtworkDetails.__proto__ || Object.getPrototypeOf(ArtworkDetails)).apply(this, arguments));}_createClass(ArtworkDetails, [{ key: "artistLine", value: function artistLine()
        {var _props$artwork =
            this.props.artwork,cultural_maker = _props$artwork.cultural_maker,artists = _props$artwork.artists;
            if (cultural_maker) {
                return React.createElement("div", null,
                React.createElement("strong", null, cultural_maker));
            } else
            if (artists && artists.length) {
                var artistLine = artists.
                map(function (artist) {return React.createElement(text_link_1.default, { href: artist.href, key: artist.__id }, artist.name);}).
                reduce(function (prev, curr) {return [prev, ", ", curr];});
                return React.createElement("div", null,
                React.createElement("strong", null, artistLine));
            }
        } }, { key: "titleLine", value: function titleLine()
        {
            return React.createElement(text_link_1.default, { href: this.props.artwork.href },
            React.createElement("em", null, this.props.artwork.title),
            this.props.artwork.date && ", " + this.props.artwork.date);
        } }, { key: "partnerLine", value: function partnerLine()
        {
            if (this.props.artwork.collecting_institution) {
                return React.createElement("div", null, this.props.artwork.collecting_institution);
            } else
            {
                return React.createElement("div", null,
                React.createElement(text_link_1.default, { href: this.props.artwork.partner.href }, this.props.artwork.partner.name));
            }
        }
        // saleLine() {
        //   const artwork = this.props.artwork
        //   const hasSaleMessage = artwork.sale_message && artwork.sale_message !== "Contact For Price"
        //   const notInAuction = !(artwork.sale && artwork.sale.is_auction)
        //   if (hasSaleMessage && notInAuction) {
        //     return <div>{artwork.sale_message}</div>
        //   }
        // }
    }, { key: "render", value: function render() {
            return React.createElement("div", null,
            this.artistLine(),
            this.titleLine(),
            this.partnerLine());
        } }]);return ArtworkDetails;}(React.Component);

exports.ArtworkDetails = ArtworkDetails;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Relay.createContainer(ArtworkDetails, {
    fragments: {
        artwork: function artwork() {return function () {return { children: [{ fieldName: "href", kind: "Field", metadata: {}, type: "String" }, { fieldName: "title", kind: "Field", metadata: {}, type: "String" }, { fieldName: "date", kind: "Field", metadata: {}, type: "String" }, { fieldName: "cultural_maker", kind: "Field", metadata: {}, type: "String" }, { calls: [{ kind: "Call", metadata: {}, name: "shallow", value: { kind: "CallValue", callValue: true } }], children: [{ fieldName: "__id", kind: "Field", metadata: { isRequisite: true }, type: "ID" }, { fieldName: "href", kind: "Field", metadata: {}, type: "String" }, { fieldName: "name", kind: "Field", metadata: {}, type: "String" }], fieldName: "artists", kind: "Field", metadata: { canHaveSubselections: true, inferredRootCallName: "node", inferredPrimaryKey: "__id", isPlural: true }, type: "Artist" }, { fieldName: "collecting_institution", kind: "Field", metadata: {}, type: "String" }, { calls: [{ kind: "Call", metadata: {}, name: "shallow", value: { kind: "CallValue", callValue: true } }], children: [{ fieldName: "name", kind: "Field", metadata: {}, type: "String" }, { fieldName: "href", kind: "Field", metadata: {}, type: "String" }, { fieldName: "__id", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "ID" }], fieldName: "partner", kind: "Field", metadata: { canHaveSubselections: true, inferredRootCallName: "node", inferredPrimaryKey: "__id" }, type: "Partner" }, { fieldName: "__id", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "ID" }], id: Relay.QL.__id(), kind: "Fragment", metadata: {}, name: "Details_ArtworkRelayQL", type: "Artwork" };}();} } });
//# sourceMappingURL=details.js.map
