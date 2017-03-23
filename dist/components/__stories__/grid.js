"use strict";
var storybook_1 = require("@kadira/storybook");
var React = require("react");
var grid_1 = require("../grid");
var boxStyle = {
    backgroundColor: "#f8f8f8",
    height: "100px",
    lineHeight: "100px",
    textAlign: "center" };

storybook_1.storiesOf("Grids", grid_1.Row).
add("Basic Usage", function () {
    return React.createElement("div", { style: { margin: "20px" } },
    React.createElement(grid_1.Row, null,
    React.createElement(grid_1.Col, null,
    React.createElement("div", { style: boxStyle }, "1")),
    React.createElement(grid_1.Col, null,
    React.createElement("div", { style: boxStyle }, "2")),
    React.createElement(grid_1.Col, null,
    React.createElement("div", { style: boxStyle }, "3")),
    React.createElement(grid_1.Col, null,
    React.createElement("div", { style: boxStyle }, "4")),
    React.createElement(grid_1.Col, null,
    React.createElement("div", { style: boxStyle }, "5")),
    React.createElement(grid_1.Col, null,
    React.createElement("div", { style: boxStyle }, "6"))),
    React.createElement(grid_1.Row, null,
    React.createElement(grid_1.Col, null,
    React.createElement("div", { style: boxStyle }, "1")),
    React.createElement(grid_1.Col, null,
    React.createElement("div", { style: boxStyle }, "2")),
    React.createElement(grid_1.Col, null,
    React.createElement("div", { style: boxStyle }, "3")),
    React.createElement(grid_1.Col, null,
    React.createElement("div", { style: boxStyle }, "4"))),
    React.createElement(grid_1.Row, null,
    React.createElement(grid_1.Col, null,
    React.createElement("div", { style: boxStyle }, "1")),
    React.createElement(grid_1.Col, null,
    React.createElement("div", { style: boxStyle }, "2")),
    React.createElement(grid_1.Col, null,
    React.createElement("div", { style: boxStyle }, "3"))),
    React.createElement(grid_1.Row, null,
    React.createElement(grid_1.Col, null,
    React.createElement("div", { style: boxStyle }, "1")),
    React.createElement(grid_1.Col, null,
    React.createElement("div", { style: boxStyle }, "2"))),
    React.createElement(grid_1.Row, null,
    React.createElement(grid_1.Col, null,
    React.createElement("div", { style: boxStyle }, "1"))));
});
//# sourceMappingURL=grid.js.map
