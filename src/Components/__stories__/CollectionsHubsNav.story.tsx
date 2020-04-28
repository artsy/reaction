import { Theme } from "@artsy/palette"
import { CollectionsHubsNavQuery } from "__generated__/CollectionsHubsNavQuery.graphql"
import { useSystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "Artsy/Relay/SystemQueryRenderer"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { CollectionsHubsNavFragmentContainer } from "../CollectionsHubsNav"

storiesOf("Components/CollectionsHubsNav", module).add("default", () => (
  <Theme>
    <CollectionsHubsNavQueryRenderer />
  </Theme>
))

const CollectionsHubsNavQueryRenderer = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<CollectionsHubsNavQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query CollectionsHubsNavQuery {
          marketingHubCollections {
            ...CollectionsHubsNav_marketingHubCollections
          }
        }
      `}
      render={renderWithLoadProgress(CollectionsHubsNavFragmentContainer)}
    />
  )
}
