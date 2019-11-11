// Comes from https://github.com/facebook/relay/issues/161
// Should be used in tests as a replacement for `react-storybooks-relay-container`
//
var React = require.requireActual("react")

const graphql = (strings, ...keys) => {
  const lastIndex = strings.length - 1
  return (
    strings.slice(0, lastIndex).reduce((p, s, i) => p + s + keys[i], "") +
    strings[lastIndex]
  )
}

module.exports = {
  graphql,
  commitMutation: jest.fn(),
  QueryRenderer: props => React.createElement("div", {}),
  createFragmentContainer: component => component,
  createPaginationContainer: component => component,
  createRefetchContainer: component => component,
}
