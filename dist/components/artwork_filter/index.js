"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _templateObject = _taggedTemplateLiteral(["\n  text-align: center;\n"], ["\n  text-align: center;\n"]),_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: space-between;\n  padding: 20px 0;\n  align-items: center;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  padding: 20px 0;\n  align-items: center;\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var React = require("react");
var Relay = require("react-relay");
var styled_components_1 = require("styled-components");
var artwork_grid_1 = require("../artwork_grid");
var bordered_pulldown_1 = require("../bordered_pulldown");
var dropdown_1 = require("./dropdown");
var for_sale_checkbox_1 = require("./for_sale_checkbox");
var headline_1 = require("./headline");
var total_count_1 = require("./total_count");
var PageSize = 10;var
ArtworkFilter = function (_React$Component) {_inherits(ArtworkFilter, _React$Component);
    function ArtworkFilter(props) {_classCallCheck(this, ArtworkFilter);var _this = _possibleConstructorReturn(this, (ArtworkFilter.__proto__ || Object.getPrototypeOf(ArtworkFilter)).call(this,
        props));
        _this.state = {
            for_sale: false,
            dimension_range: "*",
            price_range: "*",
            medium: "*" };return _this;

    }_createClass(ArtworkFilter, [{ key: "setForSale", value: function setForSale()
        {
            var isForSale = !this.state.for_sale;
            var forSaleVar = isForSale ? true : null;
            this.setState({
                for_sale: isForSale });

            this.props.relay.setVariables({
                for_sale: forSaleVar });

        } }, { key: "onSelect", value: function onSelect(
        count, slice) {
            this.setState(_defineProperty({},
            slice.toLowerCase(), count.name));

            this.props.relay.setVariables(_defineProperty({},
            slice.toLowerCase(), count.id));

        } }, { key: "onChangeSort", value: function onChangeSort(
        option) {
            this.props.relay.setVariables({
                sort: option.val });

        } }, { key: "render", value: function render()
        {var _this2 = this;
            var filterArtworks = this.props.filter_artworks.filter_artworks;
            var dropdowns = filterArtworks.aggregations.map(function (aggregation) {return React.createElement(dropdown_1.default, { aggregation: aggregation, key: aggregation.slice, onSelect: function onSelect(count, slice) {return _this2.onSelect(count, slice);} });});
            var pulldownOptions = [
            { val: "-partner_updated_at", name: "Recently Updated" },
            { val: "-year", name: "Artwork Year (desc.)" },
            { val: "year", name: "Artwork Year (asc.)" }];

            return React.createElement("div", null,
            React.createElement(FilterBar, null,
            React.createElement(for_sale_checkbox_1.default, { checked: this.state.for_sale, onClick: function onClick() {return _this2.setForSale();} }),
            dropdowns),
            React.createElement(SubFilterBar, null,
            React.createElement("div", null,
            React.createElement(headline_1.default, { medium: this.state.medium, price_range: this.state.price_range, dimension_range: this.state.dimension_range, for_sale: this.state.for_sale }),
            React.createElement(total_count_1.default, { filter_artworks: filterArtworks })),
            React.createElement(bordered_pulldown_1.default, { defaultValue: "Recently Updated", options: pulldownOptions, onChange: function onChange(option) {return _this2.onChangeSort(option);} })),
            React.createElement(artwork_grid_1.default, { artworks: filterArtworks.artworks }));
        } }]);return ArtworkFilter;}(React.Component);

var FilterBar = styled_components_1.default.div(_templateObject);


var SubFilterBar = styled_components_1.default.div(_templateObject2);





Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Relay.createContainer(ArtworkFilter, {
    initialVariables: {
        sort: "-partner_updated_at",
        size: PageSize,
        for_sale: null,
        medium: "*",
        aggregations: ["MEDIUM", "TOTAL", "PRICE_RANGE", "DIMENSION_RANGE"],
        price_range: "*",
        dimension_range: "*" },

    fragments: {
        filter_artworks: function filter_artworks() {return function (RQL_0, RQL_1, RQL_2) {return { children: [{ calls: [{ kind: "Call", metadata: { type: "[ArtworkAggregation]" }, name: "aggregations", value: { kind: "CallVariable", callVariableName: "aggregations" } }, { kind: "Call", metadata: { type: "Int" }, name: "size", value: { kind: "CallVariable", callVariableName: "size" } }, { kind: "Call", metadata: {}, name: "for_sale", value: { kind: "CallVariable", callVariableName: "for_sale" } }, { kind: "Call", metadata: {}, name: "medium", value: { kind: "CallVariable", callVariableName: "medium" } }, { kind: "Call", metadata: {}, name: "price_range", value: { kind: "CallVariable", callVariableName: "price_range" } }, { kind: "Call", metadata: {}, name: "dimension_range", value: { kind: "CallVariable", callVariableName: "dimension_range" } }, { kind: "Call", metadata: {}, name: "sort", value: { kind: "CallVariable", callVariableName: "sort" } }], children: [].concat.apply([], [{ children: [].concat.apply([], [Relay.QL.__frag(RQL_1)]), fieldName: "aggregations", kind: "Field", metadata: { canHaveSubselections: true, isPlural: true }, type: "ArtworksAggregationResults" }, { alias: "artworks", calls: [{ kind: "Call", metadata: { type: "Int" }, name: "first", value: { kind: "CallVariable", callVariableName: "size" } }], children: [].concat.apply([], [Relay.QL.__frag(RQL_2)]), fieldName: "artworks_connection", kind: "Field", metadata: { canHaveSubselections: true, isConnection: true }, type: "ArtworkConnection" }, Relay.QL.__frag(RQL_0)]), fieldName: "filter_artworks", kind: "Field", metadata: { canHaveSubselections: true }, type: "FilterArtworks" }], id: Relay.QL.__id(), kind: "Fragment", metadata: {}, name: "Index_Filter_artworksRelayQL", type: "Viewer" };}(










            total_count_1.default.getFragment("filter_artworks"),

            dropdown_1.default.getFragment("aggregation"),


            artwork_grid_1.default.getFragment("artworks"));} } });
//# sourceMappingURL=index.js.map
