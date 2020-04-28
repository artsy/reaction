import { Theme } from "@artsy/palette"
import { CollectionsHubsHomepageNavQuery } from "__generated__/CollectionsHubsHomepageNavQuery.graphql"
import { useSystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "Artsy/Relay/SystemQueryRenderer"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { CollectionsHubsHomepageNavFragmentContainer } from "../CollectionsHubsHomepageNav"

storiesOf("Components/CollectionsHubsHomepageNav", module).add(
  "default",
  () => (
    <Theme>
      <CollectionsHubsHomepageNavQueryRenderer />
    </Theme>
  )
)

const CollectionsHubsHomepageNavQueryRenderer = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<CollectionsHubsHomepageNavQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query CollectionsHubsHomepageNavQuery {
          marketingHubCollections {
            ...CollectionsHubsHomepageNav_marketingHubCollections
          }
        }
      `}
      render={renderWithLoadProgress(
        CollectionsHubsHomepageNavFragmentContainer
      )}
    />
  )
}
