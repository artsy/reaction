"use strict";
var storybook_1 = require("@kadira/storybook");
var React = require("react");
var default_1 = require("../buttons/default");
var facebook_1 = require("../buttons/facebook");
var ghost_1 = require("../buttons/ghost");
var inverted_1 = require("../buttons/inverted");
var twitter_1 = require("../buttons/twitter");
storybook_1.storiesOf("Buttons", default_1.default).
add("Default Button", function () {
    return React.createElement("div", null,
    React.createElement("div", null,
    React.createElement(default_1.default, null, "Button"),
    React.createElement(default_1.default, { disabled: true }, "Button")),
    React.createElement("div", null,
    React.createElement(default_1.default, { state: default_1.ButtonState.Success }, "Button"),
    React.createElement(default_1.default, { state: default_1.ButtonState.Success, disabled: true }, "Button")),
    React.createElement("div", null,
    React.createElement(default_1.default, { state: default_1.ButtonState.Failure }, "Button"),
    React.createElement(default_1.default, { state: default_1.ButtonState.Failure, disabled: true }, "Button")));
}).
add("Inverted Button", function () {
    return React.createElement("div", null,
    React.createElement("div", null,
    React.createElement(inverted_1.default, null, "Inverted Button"),
    React.createElement(inverted_1.default, { disabled: true }, "Button")));
}).
add("Ghost Button", function () {
    return React.createElement("div", null,
    React.createElement("div", null,
    React.createElement(ghost_1.default, null, "Ghost Button"),
    React.createElement(ghost_1.default, { disabled: true }, "Button")));
}).
add("Block Button", function () {
    return React.createElement(default_1.default, { block: true }, "Block Button");
}).
add("Facebook Button", function () {
    return React.createElement(facebook_1.default, null);
}).
add("Twitter Button", function () {
    return React.createElement(twitter_1.default, null);
});
//# sourceMappingURL=buttons.js.map
