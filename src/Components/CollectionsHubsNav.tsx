import { CollectionsHubsNav_marketingHubCollections } from "__generated__/CollectionsHubsNav_marketingHubCollections.graphql"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface CollectionsHubsNavProps {
  marketingHubCollections: CollectionsHubsNav_marketingHubCollections
}

export const CollectionsHubsNav: SFC<CollectionsHubsNavProps> = props => {
  return <div>Hello, {JSON.stringify(props.marketingHubCollections)}</div>
}

export const CollectionsHubsNavFragmentContainer = createFragmentContainer(
  CollectionsHubsNav,
  {
    marketingHubCollections: graphql`
      fragment CollectionsHubsNav_marketingHubCollections on MarketingCollection
        @relay(plural: true) {
        id
        slug
        title
        thumbnail
      }
    `,
  }
)
