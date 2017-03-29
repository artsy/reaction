"use strict";
var storybook_1 = require("@kadira/storybook");
var React = require("react");
var Relay = require("react-relay");
var index_1 = require("../artwork/index");
var config_1 = require("../../relay/config");
var root_queries_1 = require("../../relay/root_queries");
function ArtworkExample(props) {
    Relay.injectNetworkLayer(config_1.artsyNetworkLayer());
    return React.createElement(Relay.RootContainer, { Component: index_1.default, route: new root_queries_1.ArtworkQueryConfig({ artworkID: props.artworkID }) });
}
storybook_1.storiesOf("Artwork", index_1.default).
add("A square artwork", function () {return React.createElement(ArtworkExample, { artworkID: "christopher-burkett-coastal-storm-oregon" });}).
add("A landscape artwork", function () {return React.createElement(ArtworkExample, { artworkID: "takashi-murakami-tan-tan-bo" });}).
add("A landscape artwork (extra wide)", function () {return React.createElement(ArtworkExample, { artworkID: "brian-kosoff-bay-of-islands" });}).
add("A portrait artwork", function () {return React.createElement(ArtworkExample, { artworkID: "ester-curini-my-eyes-my-soul" });}).
add("A portrait artwork (extra tall)", function () {return React.createElement(ArtworkExample, { artworkID: "snik-untitled-vertical" });});
//# sourceMappingURL=artwork.js.map
