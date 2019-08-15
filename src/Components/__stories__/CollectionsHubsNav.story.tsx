import { Theme } from "@artsy/palette"
import { CollectionsHubsNavQuery } from "__generated__/CollectionsHubsNavQuery.graphql"
import { SystemContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React from "react"
import { graphql, QueryRenderer } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { CollectionsHubsNavFragmentContainer } from "../v2/CollectionsHubsNav"

storiesOf("Components/CollectionsHubsNav", module).add("default", () => (
  <Theme>
    <CollectionsHubsNavQueryRenderer />
  </Theme>
))

const CollectionsHubsNavQueryRenderer = () => {
  return (
    <SystemContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<CollectionsHubsNavQuery>
            environment={relayEnvironment}
            variables={{}}
            query={graphql`
              query CollectionsHubsNavQuery {
                marketingCollections(size: 6) {
                  ...CollectionsHubsNav_marketingCollections
                }
              }
            `}
            render={renderWithLoadProgress(CollectionsHubsNavFragmentContainer)}
          />
        )
      }}
    </SystemContextConsumer>
  )
}
