// Comes from https://github.com/facebook/relay/issues/161
// Should be used in tests as a replacement for `react-storybooks-relay-container`
//
var React = require.requireActual("react")
var Relay = require.requireActual("react-relay")

module.exports = {
  graphql: Relay.graphql,
  commitMutation: jest.fn(),
  QueryRenderer: props => React.createElement("div", {}),
  createFragmentContainer: component => component,
  createPaginationContainer: component => component,
  createRefetchContainer: component => component,
}