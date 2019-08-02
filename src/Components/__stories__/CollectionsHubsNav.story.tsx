import { Theme } from "@artsy/palette"
import { MockRelayRenderer } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { marketingHubCollections } from "../_fixtures_/collectionsHubs"
import { CollectionsHubsNavFragmentContainer } from "../CollectionsHubsNav"

storiesOf("Components/CollectionsHubsNav", module).add("default", () => (
  <Theme>{render()}</Theme>
))

const hubsQuery = graphql`
  query CollectionsHubsNavStoryQuery {
    marketingHubCollections {
      ...CollectionsHubsNav_marketingHubCollections
    }
  }
`

const render = () => {
  return (
    <MockRelayRenderer
      Component={CollectionsHubsNavFragmentContainer}
      mockData={{ marketingHubCollections }}
      query={hubsQuery}
    />
  )
}
