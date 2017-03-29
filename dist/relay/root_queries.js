"use strict";function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var Relay = require("react-relay");var
FilterArtworksQueryConfig = function (_Relay$Route) {_inherits(FilterArtworksQueryConfig, _Relay$Route);function FilterArtworksQueryConfig() {_classCallCheck(this, FilterArtworksQueryConfig);return _possibleConstructorReturn(this, (FilterArtworksQueryConfig.__proto__ || Object.getPrototypeOf(FilterArtworksQueryConfig)).apply(this, arguments));}return FilterArtworksQueryConfig;}(Relay.Route);

FilterArtworksQueryConfig.queries = {
  filter_artworks: function filter_artworks(component, params) {return function (RQL_0) {return { children: [].concat.apply([], [Relay.QL.__frag(RQL_0)]), fieldName: "viewer", kind: "Query", metadata: {}, name: "Root_queries", type: "Viewer" };}(


    component.getFragment("filter_artworks"));} };




FilterArtworksQueryConfig.routeName = "FilterArtworksQueryConfig";
exports.FilterArtworksQueryConfig = FilterArtworksQueryConfig;var
ArtworkQueryConfig = function (_Relay$Route2) {_inherits(ArtworkQueryConfig, _Relay$Route2);function ArtworkQueryConfig() {_classCallCheck(this, ArtworkQueryConfig);return _possibleConstructorReturn(this, (ArtworkQueryConfig.__proto__ || Object.getPrototypeOf(ArtworkQueryConfig)).apply(this, arguments));}return ArtworkQueryConfig;}(Relay.Route);

ArtworkQueryConfig.queries = {
  artwork: function artwork(component, params) {return function (RQL_0) {return { calls: [{ kind: "Call", metadata: { type: "String!" }, name: "id", value: { kind: "CallVariable", callVariableName: "artworkID" } }], children: [].concat.apply([], [{ fieldName: "__id", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "ID" }, Relay.QL.__frag(RQL_0)]), fieldName: "artwork", kind: "Query", metadata: { identifyingArgName: "id", identifyingArgType: "String!" }, name: "Root_queries", type: "Artwork" };}(


    component.getFragment("artwork", params));} };




ArtworkQueryConfig.paramDefinitions = {
  artworkID: { required: true } };

ArtworkQueryConfig.routeName = "ArtworkQueryConfig";
exports.ArtworkQueryConfig = ArtworkQueryConfig;var
ArtistQueryConfig = function (_Relay$Route3) {_inherits(ArtistQueryConfig, _Relay$Route3);function ArtistQueryConfig() {_classCallCheck(this, ArtistQueryConfig);return _possibleConstructorReturn(this, (ArtistQueryConfig.__proto__ || Object.getPrototypeOf(ArtistQueryConfig)).apply(this, arguments));}return ArtistQueryConfig;}(Relay.Route);

ArtistQueryConfig.queries = {
  artist: function artist(component, params) {return function (RQL_0) {return { calls: [{ kind: "Call", metadata: { type: "String!" }, name: "id", value: { kind: "CallVariable", callVariableName: "artistID" } }], children: [].concat.apply([], [{ fieldName: "__id", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "ID" }, Relay.QL.__frag(RQL_0)]), fieldName: "artist", kind: "Query", metadata: { identifyingArgName: "id", identifyingArgType: "String!" }, name: "Root_queries", type: "Artist" };}(


    component.getFragment("artist", params));} };




ArtistQueryConfig.paramDefinitions = {
  artistID: { required: true } };

ArtistQueryConfig.routeName = "ArtistQueryConfig";
exports.ArtistQueryConfig = ArtistQueryConfig;
//# sourceMappingURL=root_queries.js.map
