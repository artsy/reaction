"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var React = require("react");
var Relay = require("react-relay");
var text_link_1 = require("../text_link");var
ArtworkContact = function (_React$Component) {_inherits(ArtworkContact, _React$Component);function ArtworkContact() {_classCallCheck(this, ArtworkContact);return _possibleConstructorReturn(this, (ArtworkContact.__proto__ || Object.getPrototypeOf(ArtworkContact)).apply(this, arguments));}_createClass(ArtworkContact, [{ key: "contactLine", value: function contactLine()
        {var
            artwork = this.props.artwork;
            if (artwork.sale && artwork.sale.is_auction) {
                return this.auctionLine();
            } else
            if (artwork.is_inquireable) {
                return this.contactPartnerLine();
            }
        } }, { key: "auctionLine", value: function auctionLine()
        {var
            artwork = this.props.artwork;
            if (artwork.sale.is_live_open) {
                return React.createElement(text_link_1.default, { href: artwork.href, underline: true }, "Enter Live Auction");
            } else
            if (artwork.sale.is_open) {
                var sa = artwork.sale_artwork;
                var bids = sa.counts.bidder_positions;
                if (bids > 0) {
                    var s = bids > 1 ? "s" : "";
                    return React.createElement("span", null,
                    sa.highest_bid.display,
                    " (",
                    bids,
                    " bid",
                    s,
                    ")");
                } else
                {
                    return React.createElement("span", null, sa.opening_bid.display);
                }
            } else
            if (artwork.sale.is_closed) {
                return React.createElement("span", null, "Auction closed");
            } else
            {
                return React.createElement("span", null);
            }
        } }, { key: "contactPartnerLine", value: function contactPartnerLine()
        {
            return React.createElement(text_link_1.default, { href: this.props.artwork.href, underline: true },
            "Contact ",
            this.props.artwork.partner.type.toLowerCase());
        } }, { key: "render", value: function render()
        {
            return React.createElement("div", null, this.contactLine());
        } }]);return ArtworkContact;}(React.Component);

exports.ArtworkContact = ArtworkContact;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Relay.createContainer(ArtworkContact, {
    fragments: {
        artwork: function artwork() {return function () {return { children: [{ fieldName: "_id", kind: "Field", metadata: {}, type: "String" }, { fieldName: "href", kind: "Field", metadata: {}, type: "String" }, { fieldName: "is_inquireable", kind: "Field", metadata: {}, type: "Boolean" }, { children: [{ fieldName: "is_auction", kind: "Field", metadata: {}, type: "Boolean" }, { fieldName: "is_live_open", kind: "Field", metadata: {}, type: "Boolean" }, { fieldName: "is_open", kind: "Field", metadata: {}, type: "Boolean" }, { fieldName: "is_closed", kind: "Field", metadata: {}, type: "Boolean" }, { fieldName: "__id", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "ID" }], fieldName: "sale", kind: "Field", metadata: { canHaveSubselections: true }, type: "Sale" }, { calls: [{ kind: "Call", metadata: {}, name: "shallow", value: { kind: "CallValue", callValue: true } }], children: [{ fieldName: "type", kind: "Field", metadata: {}, type: "String" }, { fieldName: "__id", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "ID" }], fieldName: "partner", kind: "Field", metadata: { canHaveSubselections: true, inferredRootCallName: "node", inferredPrimaryKey: "__id" }, type: "Partner" }, { children: [{ children: [{ fieldName: "display", kind: "Field", metadata: {}, type: "String" }], fieldName: "highest_bid", kind: "Field", metadata: { canHaveSubselections: true }, type: "SaleArtworkHighestBid" }, { children: [{ fieldName: "display", kind: "Field", metadata: {}, type: "String" }], fieldName: "opening_bid", kind: "Field", metadata: { canHaveSubselections: true }, type: "SaleArtworkOpeningBid" }, { children: [{ fieldName: "bidder_positions", kind: "Field", metadata: {}, type: "FormattedNumber" }], fieldName: "counts", kind: "Field", metadata: { canHaveSubselections: true }, type: "SaleArtworkCounts" }, { fieldName: "__id", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "ID" }], fieldName: "sale_artwork", kind: "Field", metadata: { canHaveSubselections: true }, type: "SaleArtwork" }, { fieldName: "__id", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "ID" }], id: Relay.QL.__id(), kind: "Fragment", metadata: {}, name: "Contact_ArtworkRelayQL", type: "Artwork" };}();} } });
//# sourceMappingURL=contact.js.map
