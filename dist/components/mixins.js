"use strict";var _templateObject = _taggedTemplateLiteral(["\n    padding: 10px;\n    border: 2px solid ", ";\n    box-shadow: none;\n    font-size: 17px;\n    transition: border-color .25s;\n    margin-right: 10px;\n    resize: none;\n\n    ", "\n\n    &:focus {\n      border-color: ", ";\n      outline: 0;\n    }\n\n    &:disabled {\n      border: 2px dotted ", ";\n    }\n  "], ["\n    padding: 10px;\n    border: 2px solid ", ";\n    box-shadow: none;\n    font-size: 17px;\n    transition: border-color .25s;\n    margin-right: 10px;\n    resize: none;\n\n    ", "\n\n    &:focus {\n      border-color: ", ";\n      outline: 0;\n    }\n\n    &:disabled {\n      border: 2px dotted ", ";\n    }\n  "]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
var styled_components_1 = require("styled-components");
var colors_1 = require("../assets/colors");
var fonts = require("../assets/fonts");
exports.borderedInput = function (props) {
  return styled_components_1.css(_templateObject,

  props.error ? colors_1.default.redRegular : colors_1.default.grayRegular,






  fonts.secondary.style,


  props.error ? colors_1.default.redRegular : colors_1.default.purpleRegular,




  colors_1.default.grayRegular);


};
//# sourceMappingURL=mixins.js.map
