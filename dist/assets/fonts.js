"use strict";var _templateObject = _taggedTemplateLiteral(["\n  @font-face {\n    font-family: 'artsy-icons';\n    src: url(\"/fonts/artsy-icons.eot?uo9ko\");\n    src: url(\"/fonts/artsy-icons.eot?#iefixuo9ko\") format('embedded-opentype'),\n         url(\"/fonts/artsy-icons.woff2?uo9ko\") format('woff2'),\n         url(\"/fonts/artsy-icons.ttf?uo9ko\") format('truetype'),\n         url(\"/fonts/artsy-icons.woff?uo9ko\") format('woff'),\n         url(\"/fonts/artsy-icons.svg?uo9ko#artsy-icons\") format('svg');\n    font-weight: normal;\n    font-style: normal;\n  }\n"], ["\n  @font-face {\n    font-family: 'artsy-icons';\n    src: url(\"/fonts/artsy-icons.eot?uo9ko\");\n    src: url(\"/fonts/artsy-icons.eot?#iefixuo9ko\") format('embedded-opentype'),\n         url(\"/fonts/artsy-icons.woff2?uo9ko\") format('woff2'),\n         url(\"/fonts/artsy-icons.ttf?uo9ko\") format('truetype'),\n         url(\"/fonts/artsy-icons.woff?uo9ko\") format('woff'),\n         url(\"/fonts/artsy-icons.svg?uo9ko#artsy-icons\") format('svg');\n    font-weight: normal;\n    font-style: normal;\n  }\n"]),_templateObject2 = _taggedTemplateLiteral(["\n    font-family: ", ";\n    -webkit-font-smoothing: antialiased;\n    text-transform: uppercase;\n    letter-spacing: 1px;\n  "], ["\n    font-family: ", ";\n    -webkit-font-smoothing: antialiased;\n    text-transform: uppercase;\n    letter-spacing: 1px;\n  "]),_templateObject3 = _taggedTemplateLiteral(["\n    font-family: ", ";\n    -webkit-font-smoothing: antialiased;\n  "], ["\n    font-family: ", ";\n    -webkit-font-smoothing: antialiased;\n  "]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
var styled_components_1 = require("styled-components");
styled_components_1.injectGlobal(_templateObject);












var primaryFontFamily = "\n  'ITC Avant Garde Gothic W04',\n  'AvantGardeGothicITCW01D 731075',\n  'AvantGardeGothicITCW01Dm',\n  'Helvetica',\n  'sans-serif'\n";






exports.primary = {
  fontFamily: primaryFontFamily,
  style: styled_components_1.css(_templateObject2,
  primaryFontFamily) };





var secondaryFontFamily = "\n  'Adobe Garamond W08',\n  'adobe-garamond-pro',\n  'AGaramondPro-Regular',\n  'Times New Roman',\n  'Times',\n  'serif'\n";







exports.secondary = {
  fontFamily: secondaryFontFamily,
  style: styled_components_1.css(_templateObject3,
  secondaryFontFamily) };
//# sourceMappingURL=fonts.js.map
