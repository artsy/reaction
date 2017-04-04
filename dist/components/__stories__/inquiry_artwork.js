"use strict";
var storybook_1 = require("@kadira/storybook");
var React = require("react");
var Relay = require("react-relay");
var inquiry_artwork_brick_1 = require("../inquiry_artwork_brick");
var config_1 = require("../../relay/config");
var root_queries_1 = require("../../relay/root_queries");
function ArtworkExample(props) {
    Relay.injectNetworkLayer(config_1.artsyNetworkLayer());
    return React.createElement(Relay.RootContainer, { Component: inquiry_artwork_brick_1.default, route: new root_queries_1.ArtworkQueryConfig({ artworkID: props.artworkID }) });
}
storybook_1.storiesOf("Inquiry Artwork", inquiry_artwork_brick_1.default).
add("A square artwork", function () {return React.createElement(ArtworkExample, { artworkID: "christopher-burkett-coastal-storm-oregon" });}).
add("A landscape artwork", function () {return React.createElement(ArtworkExample, { artworkID: "takashi-murakami-tan-tan-bo" });}).
add("A landscape artwork (extra wide)", function () {return React.createElement(ArtworkExample, { artworkID: "brian-kosoff-bay-of-islands" });}).
add("A portrait artwork", function () {return React.createElement(ArtworkExample, { artworkID: "damien-hirst-methylamine-13c-19?auction_id=heather-james-fine-art-curators-choice" });}).
add("A portrait artwork (extra tall)", function () {return React.createElement(ArtworkExample, { artworkID: "snik-untitled-vertical" });}).
add("Artwork with two artists", function () {return React.createElement(ArtworkExample, { artworkID: "/william-kentridge-self-portrait-as-a-coffee-pot-iii" });});
//# sourceMappingURL=inquiry_artwork.js.map
