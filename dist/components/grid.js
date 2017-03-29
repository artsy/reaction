"use strict";var _templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  flex: 0 1 auto;\n  flex-direction: row;\n  flex-wrap: wrap;\n  margin-right: -", "px;\n  margin-left: -", "px;\n  margin-bottom: ", "px;\n"], ["\n  display: flex;\n  flex: 0 1 auto;\n  flex-direction: row;\n  flex-wrap: wrap;\n  margin-right: -", "px;\n  margin-left: -", "px;\n  margin-bottom: ", "px;\n"]),_templateObject2 = _taggedTemplateLiteral(["\n  flex: ", " 0 auto;\n  padding-right: ", "px;\n  padding-left: ", "px;\n"], ["\n  flex: ", " 0 auto;\n  padding-right: ", "px;\n  padding-left: ", "px;\n"]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
var styled_components_1 = require("styled-components");
var gapSize = 20;
exports.Row = styled_components_1.default.div(_templateObject,




gapSize / 2,
gapSize / 2,
gapSize);

exports.Col = styled_components_1.default.div(_templateObject2,
function (props) {return props.size;},
gapSize / 2,
gapSize / 2);

exports.Col.defaultProps = {
  size: 1 };
//# sourceMappingURL=grid.js.map
