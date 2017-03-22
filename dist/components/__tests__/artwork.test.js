"use strict";
var React = require("react");
var renderer = require("react-test-renderer");
var artwork_1 = require("../artwork");
describe("Artwork", function () {
    it("renders correctly", function () {
        var artworkProps = {
            title: "Some Kind of Dinosaur",
            date: "2015",
            sale_message: "$875",
            is_in_auction: false,
            image: {
                url: "artsy.net/image-url",
                aspect_ratio: 0.74 },

            artists: [
            {
                name: "Mikael Olson" }],


            partner: {
                name: "Gallery 1261" },

            href: "/artwork/mikael-olson-some-kind-of-dinosaur" };

        var artwork = renderer.create(React.createElement(artwork_1.default, { artwork: artworkProps })).toJSON();
        expect(artwork).toMatchSnapshot();
    });
});
//# sourceMappingURL=artwork.test.js.map
