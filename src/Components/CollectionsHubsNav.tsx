import { CSSGrid } from "@artsy/palette"
import { CollectionsHubsNav_marketingCollections } from "__generated__/CollectionsHubsNav_marketingCollections.graphql"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ImageLink } from "./ImageLink"

interface CollectionsHubsNavProps {
  marketingCollections: CollectionsHubsNav_marketingCollections
}

export const CollectionsHubsNav: SFC<CollectionsHubsNavProps> = props => {
  return (
    <CSSGrid
      as="aside"
      gridTemplateColumns={[
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(6, 1fr)",
      ]}
      gridGap={20}
    >
      {props.marketingCollections.map(hub => (
        <ImageLink
          href={`/collection/${hub.slug}`}
          imageUrl={hub.thumbnail || "http://placekitten.com/168/105"}
          width={[132, 132, 168, 168]}
          height={[83, 83, 105, 105]}
          key={hub.id}
        >
          {hub.title}
        </ImageLink>
      ))}
    </CSSGrid>
  )
}

export const CollectionsHubsNavFragmentContainer = createFragmentContainer(
  CollectionsHubsNav,
  {
    marketingCollections: graphql`
      fragment CollectionsHubsNav_marketingCollections on MarketingCollection
        @relay(plural: true) {
        id
        slug
        title
        thumbnail
      }
    `,
  }
)
