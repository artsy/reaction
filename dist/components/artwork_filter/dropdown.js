"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _templateObject = _taggedTemplateLiteral(["\n  background: white;\n  color: black;\n  border: 1px solid ", ";\n  display: inline-block;\n  line-height: 160%;\n  padding: 15px 35px 10px 18px;\n  font-size: 13px;\n  vertical-align: middle;\n  max-width: 120px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  ", "\n"], ["\n  background: white;\n  color: black;\n  border: 1px solid ", ";\n  display: inline-block;\n  line-height: 160%;\n  padding: 15px 35px 10px 18px;\n  font-size: 13px;\n  vertical-align: middle;\n  max-width: 120px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  ", "\n"]),_templateObject2 = _taggedTemplateLiteral(["\n  z-index: 2;\n  background: black;\n  position: absolute;\n  top: 45px;\n  left: 1px;\n  width: 300px;\n  border: 1px solid #333;\n"], ["\n  z-index: 2;\n  background: black;\n  position: absolute;\n  top: 45px;\n  left: 1px;\n  width: 300px;\n  border: 1px solid #333;\n"]),_templateObject3 = _taggedTemplateLiteral(["\n  position: absolute\n  font-size: 9px\n  margin-top: -15px;\n  color: black\n"], ["\n  position: absolute\n  font-size: 9px\n  margin-top: -15px;\n  color: black\n"]),_templateObject4 = _taggedTemplateLiteral(["\n  ", "\n  text-align: left;\n  color: white;\n  display: block;\n  border-bottom: 1px solid #333;\n  padding: 15px 18px 10px 18px;\n  text-transform: capitalize;\n  &:hover {\n    background: ", ";\n  }\n"], ["\n  ", "\n  text-align: left;\n  color: white;\n  display: block;\n  border-bottom: 1px solid #333;\n  padding: 15px 18px 10px 18px;\n  text-transform: capitalize;\n  &:hover {\n    background: ", ";\n  }\n"]),_templateObject5 = _taggedTemplateLiteral(["\n  color: ", "\n"], ["\n  color: ", "\n"]),_templateObject6 = _taggedTemplateLiteral(["\n  position: relative;\n  display: inline-block;\n  cursor: pointer;\n  margin-left: -1px;\n"], ["\n  position: relative;\n  display: inline-block;\n  cursor: pointer;\n  margin-left: -1px;\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var React = require("react");
var Relay = require("react-relay");
var icon_1 = require("../icon");
var styled_components_1 = require("styled-components");
var colors_1 = require("../../assets/colors");
var fonts_1 = require("../../assets/fonts");
var param_map_1 = require("./param_map");var
Dropdown = function (_React$Component) {_inherits(Dropdown, _React$Component);
    function Dropdown(props) {_classCallCheck(this, Dropdown);var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this,
        props));
        _this.state = {
            isHovered: false,
            selected: {} };return _this;

    }_createClass(Dropdown, [{ key: "toggleHover", value: function toggleHover()
        {
            this.setState({
                isHovered: !this.state.isHovered });

        } }, { key: "onSelect", value: function onSelect(
        count) {
            this.setState({
                selected: count });

        } }, { key: "render", value: function render()
        {var _this2 = this;
            var navItems = this.props.aggregation.counts.map(function (count) {
                return React.createElement(NavItem, { key: count.id, onClick: function onClick() {return _this2.onSelect(count);} },
                React.createElement("span", null, count.name),
                React.createElement(NavItemCount, null,
                "\xA0(",
                count.count,
                ")"));
            });
            var allLabel = param_map_1.labelMap[this.props.aggregation.slice.toLowerCase()].plural;
            navItems.unshift(React.createElement(NavItem, { key: "all", onClick: function onClick() {return _this2.onSelect({});} },
            React.createElement("span", null,
            "All ",
            allLabel)));
            var buttonColor = "white";
            var buttonTextColor = "black";
            var superLabelColor = "black";
            var navStyle = { display: "none" };
            if (this.state.selected.name) {
                buttonTextColor = colors_1.default.purpleRegular;
            }
            if (this.state.isHovered) {
                buttonColor = "black";
                buttonTextColor = "white";
                superLabelColor = "white";
                navStyle = { display: "block" };
            }
            var labelText = this.state.selected.name || this.props.aggregation.slice;
            var superLabelText = this.state.selected.name ? this.props.aggregation.slice : null;
            return React.createElement("div", { className: this.props.className, onMouseEnter: function onMouseEnter() {return _this2.toggleHover();}, onMouseLeave: function onMouseLeave() {return _this2.toggleHover();} },
            React.createElement(Button, { style: { backgroundColor: buttonColor, color: buttonTextColor } },
            superLabelText && React.createElement(SuperLabel, { style: { color: superLabelColor } }, superLabelText),
            labelText,
            React.createElement(icon_1.default, { name: "arrow-down", fontSize: "9px", color: buttonTextColor, style: { position: "absolute", right: 15 } })),
            React.createElement(Nav, { style: navStyle }, navItems));
        } }]);return Dropdown;}(React.Component);

exports.Dropdown = Dropdown;
var Button = styled_components_1.default.div(_templateObject,


colors_1.default.grayRegular,









fonts_1.primary.style);

var Nav = styled_components_1.default.div(_templateObject2);








var SuperLabel = styled_components_1.default.div(_templateObject3);





var NavItem = styled_components_1.default.div(_templateObject4,
fonts_1.secondary.style,







colors_1.default.grayBold);


var NavItemCount = styled_components_1.default.span(_templateObject5,
colors_1.default.graySemibold);

var StyledDropdown = styled_components_1.default(Dropdown)(_templateObject6);





Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Relay.createContainer(StyledDropdown, {
    fragments: {
        aggregation: function aggregation() {return function () {return { children: [{ fieldName: "slice", kind: "Field", metadata: {}, type: "ArtworkAggregation" }, { children: [{ fieldName: "name", kind: "Field", metadata: {}, type: "String" }, { fieldName: "id", kind: "Field", metadata: {}, type: "String" }, { fieldName: "count", kind: "Field", metadata: {}, type: "Int" }, { fieldName: "__id", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "ID" }], fieldName: "counts", kind: "Field", metadata: { canHaveSubselections: true, isPlural: true }, type: "AggregationCount" }], id: Relay.QL.__id(), kind: "Fragment", metadata: {}, name: "Dropdown_AggregationRelayQL", type: "ArtworksAggregationResults" };}();} } });
//# sourceMappingURL=dropdown.js.map
