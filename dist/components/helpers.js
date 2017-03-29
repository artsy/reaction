"use strict";var _templateObject = _taggedTemplateLiteral(["\n        width: calc(100% - ", "px);\n        margin: 10px auto;\n      "], ["\n        width: calc(100% - ", "px);\n        margin: 10px auto;\n      "]);function _taggedTemplateLiteral(strings, raw) {return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}
var styled_components_1 = require("styled-components");
/**
                                                         * Helper function to display an element as a block that inherits its parents width
                                                         * @param margin value in pixels to remove from width 100%
                                                         */
exports.block = function () {var margin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return function (props) {
        if (props.block) {
            return styled_components_1.css(_templateObject,
            margin);


        }
    };
};
//# sourceMappingURL=helpers.js.map
