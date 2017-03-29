"use strict";
var storybook_1 = require("@kadira/storybook");
var React = require("react");
var nav_1 = require("../nav");
var nav_item_1 = require("../nav_item");
storybook_1.storiesOf("Nav", nav_1.default).
add("Simple Nav Bar", function () {return React.createElement(nav_1.default, null,
    React.createElement(nav_item_1.default, { href: "https://www.artsy.net" }, "Back To Artsy"));});
//# sourceMappingURL=nav.js.map
