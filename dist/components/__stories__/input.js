"use strict";
var storybook_1 = require("@kadira/storybook");
var React = require("react");
var inverted_1 = require("../buttons/inverted");
var input_1 = require("../input");
var text_area_1 = require("../text_area");
storybook_1.storiesOf("Input", input_1.default).
add("Inputs", function () {return React.createElement("div", null,
    React.createElement(input_1.default, { placeholder: "First Name" }),
    React.createElement(input_1.default, { placeholder: "First Name", error: true }),
    React.createElement(input_1.default, { placeholder: "First Name", disabled: true }));}).
add("Text Areas", function () {return React.createElement("div", null,
    React.createElement(text_area_1.default, { placeholder: "Your Message" }),
    React.createElement(text_area_1.default, { placeholder: "Your Message", error: true }),
    React.createElement(text_area_1.default, { placeholder: "Your Message", disabled: true }));}).
add("Form", function () {return React.createElement("div", { style: { padding: 10 } },
    React.createElement(input_1.default, { placeholder: "First Name", block: true }),
    React.createElement(text_area_1.default, { placeholder: "Your Message", block: true }));}).
add("Form w/ Button", function () {return React.createElement("div", { style: { padding: 10 } },
    React.createElement(input_1.default, { placeholder: "Email", block: true }),
    React.createElement(input_1.default, { type: "password", placeholder: "Password", block: true }),
    React.createElement(inverted_1.default, { block: true }, "Submit"));});
//# sourceMappingURL=input.js.map
