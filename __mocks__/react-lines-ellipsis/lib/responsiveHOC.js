const React = require("react")

module.exports = () => () => {
  return function HTMLEllipsis(_ref) {
    var unsafeHTML = _ref.unsafeHTML
    return React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: unsafeHTML,
      },
    })
  }
}
