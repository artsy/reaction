"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var storybook_1 = require("@kadira/storybook");
var React = require("react");
var Relay = require("react-relay");
var config_1 = require("../../relay/config");
var root_queries_1 = require("../../relay/root_queries");
var dropdown_1 = require("../artwork_filter/dropdown");
var index_1 = require("../artwork_filter/index");
var total_count_1 = require("../artwork_filter/total_count");var
FilterArtworksDropdown = function (_React$Component) {_inherits(FilterArtworksDropdown, _React$Component);
    function FilterArtworksDropdown(props) {_classCallCheck(this, FilterArtworksDropdown);var _this = _possibleConstructorReturn(this, (FilterArtworksDropdown.__proto__ || Object.getPrototypeOf(FilterArtworksDropdown)).call(this,
        props));
        _this.state = {
            selected: "" };return _this;

    }_createClass(FilterArtworksDropdown, [{ key: "showSelection", value: function showSelection(
        count) {
            this.setState({
                selected: count.name });

        } }, { key: "render", value: function render()
        {var _this2 = this;
            var dropdowns = this.props.
            filter_artworks.
            filter_artworks.aggregations.map(function (aggregation) {return React.createElement(dropdown_1.default, { aggregation: aggregation, key: aggregation.slice, onSelect: _this2.showSelection });});
            var selected = React.createElement("div", null, this.state.selected);
            return React.createElement("div", null,
            React.createElement("div", null, dropdowns),
            React.createElement("div", { style: { padding: "20px 0" } },
            "Selected: ",
            selected));
        } }]);return FilterArtworksDropdown;}(React.Component);

var FilterArtworksDropdownContainer = Relay.createContainer(FilterArtworksDropdown, {
    fragments: {
        filter_artworks: function filter_artworks() {return function (RQL_0) {return { children: [{ calls: [{ kind: "Call", metadata: { type: "[ArtworkAggregation]" }, name: "aggregations", value: [{ kind: "CallValue", callValue: "MEDIUM" }, { kind: "CallValue", callValue: "GALLERY" }] }, { kind: "Call", metadata: {}, name: "artist_id", value: { kind: "CallValue", callValue: "christopher-williams" } }], children: [{ children: [].concat.apply([], [Relay.QL.__frag(RQL_0)]), fieldName: "aggregations", kind: "Field", metadata: { canHaveSubselections: true, isPlural: true }, type: "ArtworksAggregationResults" }], fieldName: "filter_artworks", kind: "Field", metadata: { canHaveSubselections: true }, type: "FilterArtworks" }], id: Relay.QL.__id(), kind: "Fragment", metadata: {}, name: "Artwork_filter_Filter_artworksRelayQL", type: "Viewer" };}(






            dropdown_1.default.getFragment("aggregation"));} } });var






FilterArtworksTotalCount = function (_React$Component2) {_inherits(FilterArtworksTotalCount, _React$Component2);function FilterArtworksTotalCount() {_classCallCheck(this, FilterArtworksTotalCount);return _possibleConstructorReturn(this, (FilterArtworksTotalCount.__proto__ || Object.getPrototypeOf(FilterArtworksTotalCount)).apply(this, arguments));}_createClass(FilterArtworksTotalCount, [{ key: "render", value: function render()
        {
            return React.createElement(total_count_1.default, { filter_artworks: this.props.filter_artworks.filter_artworks });
        } }]);return FilterArtworksTotalCount;}(React.Component);

var FilterArtworksTotalCountContainer = Relay.createContainer(FilterArtworksTotalCount, {
    fragments: {
        filter_artworks: function filter_artworks() {return function (RQL_0) {return { children: [{ calls: [{ kind: "Call", metadata: { type: "[ArtworkAggregation]" }, name: "aggregations", value: [{ kind: "CallValue", callValue: "TOTAL" }] }, { kind: "Call", metadata: {}, name: "artist_id", value: { kind: "CallValue", callValue: "christopher-williams" } }], children: [].concat.apply([], [Relay.QL.__frag(RQL_0)]), fieldName: "filter_artworks", kind: "Field", metadata: { canHaveSubselections: true }, type: "FilterArtworks" }], id: Relay.QL.__id(), kind: "Fragment", metadata: {}, name: "Artwork_filter_Filter_artworksRelayQL", type: "Viewer" };}(





            total_count_1.default.getFragment("filter_artworks"));} } });





function FilterArtworksDropdownExample() {
    Relay.injectNetworkLayer(config_1.artsyNetworkLayer());
    return React.createElement(Relay.RootContainer, { Component: FilterArtworksDropdownContainer, route: new root_queries_1.FilterArtworksQueryConfig() });
}
function FilterArtworksTotalCountExample() {
    Relay.injectNetworkLayer(config_1.artsyNetworkLayer());
    return React.createElement(Relay.RootContainer, { Component: FilterArtworksTotalCountContainer, route: new root_queries_1.FilterArtworksQueryConfig() });
}
function FilterArtworksExample() {
    Relay.injectNetworkLayer(config_1.artsyNetworkLayer());
    return React.createElement(Relay.RootContainer, { Component: index_1.default, route: new root_queries_1.FilterArtworksQueryConfig() });
}
storybook_1.storiesOf("Artwork Filter Components", dropdown_1.default).
add("Filter dropdown", function () {return React.createElement(FilterArtworksDropdownExample, null);}).
add("Total Count", function () {return React.createElement(FilterArtworksTotalCountExample, null);}).
add("Artwork filter", function () {return React.createElement(FilterArtworksExample, null);});
//# sourceMappingURL=artwork_filter.js.map
