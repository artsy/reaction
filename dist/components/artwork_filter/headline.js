"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _templateObject = _taggedTemplateLiteral(["\n  ", "\n  font-weight: normal;\n  margin: 0;\n"], ["\n  ", "\n  font-weight: normal;\n  margin: 0;\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var React = require("react");
var fonts_1 = require("../../assets/fonts");
var lodash_1 = require("lodash");
var styled_components_1 = require("styled-components");var
Headline = function (_React$Component) {_inherits(Headline, _React$Component);function Headline() {_classCallCheck(this, Headline);return _possibleConstructorReturn(this, (Headline.__proto__ || Object.getPrototypeOf(Headline)).apply(this, arguments));}_createClass(Headline, [{ key: "size", value: function size()
        {var
            dimension_range = this.props.dimension_range;
            if (dimension_range && dimension_range !== "*") {
                return dimension_range;
            }
            return false;
        } }, { key: "medium", value: function medium()
        {var
            medium = this.props.medium;
            if (medium && medium !== "*") {
                return medium;
            }
            return "Works";
        } }, { key: "priceRange", value: function priceRange()
        {var
            price_range = this.props.price_range;
            if (price_range && price_range !== "*") {
                return price_range;
            }
            return false;
        } }, { key: "forSale", value: function forSale()
        {
            if (this.props.for_sale) {
                return "For Sale";
            }
            return false;
        } }, { key: "renderHeadline", value: function renderHeadline()
        {
            var headline = lodash_1.compact([
            this.size(),
            this.medium(),
            this.priceRange(),
            this.forSale()]).
            join(" ");
            if (headline === "works") {
                return "Artworks";
            }
            return headline.charAt(0).toUpperCase() + headline.substr(1);
        } }, { key: "render", value: function render()
        {
            return React.createElement("h1", { className: this.props.className }, this.renderHeadline());
        } }]);return Headline;}(React.Component);

exports.Headline = Headline;
var StyledHeadline = styled_components_1.default(Headline)(_templateObject,
fonts_1.secondary.style);



Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StyledHeadline;
//# sourceMappingURL=headline.js.map
