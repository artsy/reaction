"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _templateObject = _taggedTemplateLiteral(["\n  display: flex\n"], ["\n  display: flex\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var React = require("react");
var Relay = require("react-relay");
var styled_components_1 = require("styled-components");
var index_1 = require("./artwork/index");var
ArtworkGrid = function (_React$Component) {_inherits(ArtworkGrid, _React$Component);function ArtworkGrid() {_classCallCheck(this, ArtworkGrid);return _possibleConstructorReturn(this, (ArtworkGrid.__proto__ || Object.getPrototypeOf(ArtworkGrid)).apply(this, arguments));}_createClass(ArtworkGrid, [{ key: "sectionedArtworks", value: function sectionedArtworks()
        {
            var sectionedArtworks = [];
            var sectionRatioSums = [];
            var artworks = this.props.artworks ? this.props.artworks.edges : [];
            for (var i = 0; i < this.props.columnCount; i++) {
                sectionedArtworks.push([]);
                sectionRatioSums.push(0);
            }
            artworks.forEach(function (artworkEdge) {
                var artwork = artworkEdge.node;
                // There are artworks without images and other ‘issues’. Like Force we’re just going to reject those for now.
                // See: https://github.com/artsy/eigen/issues/1667
                if (artwork.image) {
                    // Find section with lowest *inverted* aspect ratio sum, which is the shortest column.
                    var lowestRatioSum = Number.MAX_VALUE;
                    var sectionIndex = null;
                    for (var j = 0; j < sectionRatioSums.length; j++) {
                        var ratioSum = sectionRatioSums[j];
                        if (ratioSum < lowestRatioSum) {
                            sectionIndex = j;
                            lowestRatioSum = ratioSum;
                        }
                    }
                    if (sectionIndex != null) {
                        var section = sectionedArtworks[sectionIndex];
                        section.push(artwork);
                        // Keep track of total section aspect ratio
                        var aspectRatio = artwork.image.aspect_ratio || 1; // Ensure we never divide by null/0
                        // Invert the aspect ratio so that a lower value means a shorter section.
                        sectionRatioSums[sectionIndex] += 1 / aspectRatio;
                    }
                }
            });
            return sectionedArtworks;
        } }, { key: "renderSections", value: function renderSections()
        {
            var spacerStyle = {
                height: this.props.itemMargin };

            var sectionedArtworks = this.sectionedArtworks();
            var sections = [];
            for (var i = 0; i < this.props.columnCount; i++) {
                var artworkComponents = [];
                for (var j = 0; j < sectionedArtworks[i].length; j++) {
                    var artwork = sectionedArtworks[i][j];
                    artworkComponents.push(React.createElement(index_1.default, { artwork: artwork, key: "artwork-" + j + "-" + artwork.__id }));
                    // Setting a marginBottom on the artwork component didn’t work, so using a spacer view instead.
                    if (j < sectionedArtworks[i].length - 1) {
                        artworkComponents.push(React.createElement("div", { style: spacerStyle, key: "spacer-" + j + "-" + artwork.__id }));
                    }
                }
                var sectionSpecificStyle = {
                    flex: 1,
                    marginRight: i === this.props.columnCount - 1 ? 0 : this.props.sectionMargin };

                sections.push(React.createElement("div", { style: sectionSpecificStyle, key: i }, artworkComponents));
            }
            return sections;
        } }, { key: "render", value: function render()
        {
            var artworks = this.renderSections() || [];
            return React.createElement("div", { className: this.props.className }, artworks);
        } }]);return ArtworkGrid;}(React.Component);

exports.ArtworkGrid = ArtworkGrid;
ArtworkGrid.defaultProps = {
    columnCount: 3,
    sectionMargin: 20,
    itemMargin: 20 };

var StyledGrid = styled_components_1.default(ArtworkGrid)(_templateObject);


var ArtworkFragment = function (RQL_0) {return { children: [].concat.apply([], [{ fieldName: "__id", kind: "Field", metadata: { isRequisite: true }, type: "ID" }, { children: [{ fieldName: "aspect_ratio", kind: "Field", metadata: {}, type: "Float" }], fieldName: "image", kind: "Field", metadata: { canHaveSubselections: true }, type: "Image" }, Relay.QL.__frag(RQL_0)]), id: Relay.QL.__id(), kind: "Fragment", metadata: {}, name: "Artwork_gridRelayQL", type: "Artwork" };}(





index_1.default.getFragment("artwork"));


Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Relay.createContainer(StyledGrid, {
    fragments: {
        artworks: function artworks() {return function (RQL_0) {return { children: [{ children: [{ children: [].concat.apply([], [{ fieldName: "__id", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "ID" }, Relay.QL.__frag(RQL_0)]), fieldName: "node", kind: "Field", metadata: { canHaveSubselections: true, inferredRootCallName: "node", inferredPrimaryKey: "__id", isRequisite: true }, type: "Artwork" }, { fieldName: "cursor", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "String" }], fieldName: "edges", kind: "Field", metadata: { canHaveSubselections: true, isPlural: true }, type: "ArtworkEdge" }, { children: [{ fieldName: "hasNextPage", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "Boolean" }, { fieldName: "hasPreviousPage", kind: "Field", metadata: { isGenerated: true, isRequisite: true }, type: "Boolean" }], fieldName: "pageInfo", kind: "Field", metadata: { canHaveSubselections: true, isGenerated: true, isRequisite: true }, type: "PageInfo" }], id: Relay.QL.__id(), kind: "Fragment", metadata: {}, name: "Artwork_grid_ArtworksRelayQL", type: "ArtworkConnection" };}(



            ArtworkFragment);} } });
//# sourceMappingURL=artwork_grid.js.map
