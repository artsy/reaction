"use strict";
var storybook_1 = require("@kadira/storybook");
var React = require("react");
var colors_1 = require("../../assets/colors");
var text_1 = require("../text");
var text_link_1 = require("../text_link");
var title_1 = require("../title");
storybook_1.storiesOf("Typography", title_1.default).
add("Headings", function () {return React.createElement("div", null,
    React.createElement(title_1.default, { titleSize: "xxlarge" }, "XXLarge Title: 72px"),
    React.createElement(title_1.default, { titleSize: "xlarge" }, "XLarge Title: 50px"),
    React.createElement(title_1.default, { titleSize: "large" }, "Large Title: 37px"),
    React.createElement(title_1.default, { titleSize: "medium" }, "Medium Title: 30px"),
    React.createElement(title_1.default, { titleSize: "small" }, "Small Title: 25px"));}).
add("Text", function () {return React.createElement("div", null,
    React.createElement(title_1.default, null, "Plain Text"),
    React.createElement(text_1.default, { textSize: "large" }, "Large text: Thank you for your interest in the program."),
    React.createElement(text_1.default, null, "Small text: Thank you for your interest in the program."),
    React.createElement(title_1.default, null, "Alignment"),
    React.createElement(text_1.default, null,
    "Thank you for your interest in the program.",
    React.createElement("br", null),
    "Have questions? Get in touch"),
    React.createElement(text_1.default, { align: "center" },
    "Thank you for your interest in the program.",
    React.createElement("br", null),
    "Have questions? Get in touch"),
    React.createElement(text_1.default, { align: "end" },
    "Thank you for your interest in the program.",
    React.createElement("br", null),
    "Have questions? Get in touch"),
    React.createElement(title_1.default, null, "Text Color"),
    React.createElement(text_1.default, { align: "center", color: colors_1.default.graySemibold },
    "Have questions? Get in touch:\xA0",
    React.createElement(text_link_1.default, { href: "#" }, "youremail@example.com")));});
//# sourceMappingURL=typography.js.map
