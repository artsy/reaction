"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var storybook_1 = require("@kadira/storybook");
var React = require("react");
var Relay = require("react-relay");
var artwork_grid_1 = require("../artwork_grid");
var config_1 = require("../../relay/config");
var root_queries_1 = require("../../relay/root_queries");var
ArtistArtworks = function (_React$Component) {_inherits(ArtistArtworks, _React$Component);function ArtistArtworks() {_classCallCheck(this, ArtistArtworks);return _possibleConstructorReturn(this, (ArtistArtworks.__proto__ || Object.getPrototypeOf(ArtistArtworks)).apply(this, arguments));}_createClass(ArtistArtworks, [{ key: "render", value: function render()
        {
            return React.createElement(artwork_grid_1.default, { artworks: this.props.artist.artworks });
        } }]);return ArtistArtworks;}(React.Component);

exports.ArtistArtworks = ArtistArtworks;
var ArtistArtworksContainer = Relay.createContainer(ArtistArtworks, {
    fragments: {
        artist: function artist() {return function (RQL_0) {return { children: [{ alias: "artworks", calls: [{ kind: "Call", metadata: { type: "Int" }, name: "first", value: { kind: "CallValue", callValue: 10 } }], children: [].concat.apply([], [Relay.QL.__frag(RQL_0)]), fieldName: "artworks_connection", kind: "Field", metadata: { canHaveSubselections: true, isConnection: true }, type: "ArtworkConnection" }, { fieldName: "__id", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "ID" }], id: Relay.QL.__id(), kind: "Fragment", metadata: {}, name: "Artwork_grid_ArtistRelayQL", type: "Artist" };}(


            artwork_grid_1.default.getFragment("artworks"));} } });





function GridExample(props) {
    Relay.injectNetworkLayer(config_1.artsyNetworkLayer());
    return React.createElement(Relay.RootContainer, { Component: ArtistArtworksContainer, route: new root_queries_1.ArtistQueryConfig({ artistID: props.artistID }) });
}
storybook_1.storiesOf("ArtworkGrid", artwork_grid_1.default).
add("A typical grid", function () {return React.createElement(GridExample, { artistID: "banksy" });});
//# sourceMappingURL=artwork_grid.js.map
