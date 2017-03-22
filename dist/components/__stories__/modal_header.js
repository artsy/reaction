"use strict";
var storybook_1 = require("@kadira/storybook");
var React = require("react");
var modal_header_1 = require("../modal_header");
var title_1 = require("../title");
storybook_1.storiesOf("ModalHeader", modal_header_1.default).
add("Simple login header", function () {return React.createElement(modal_header_1.default, null,
    React.createElement(title_1.default, null, "Welcome back, please log in to your account."));});
//# sourceMappingURL=modal_header.js.map
