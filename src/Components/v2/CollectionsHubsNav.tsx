import { CSSGrid } from "@artsy/palette"
import { CollectionsHubsNav_marketingCollections } from "__generated__/CollectionsHubsNav_marketingCollections.graphql"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { Serif } from "@artsy/palette"
import { ImageLink } from "./ImageLink"

interface CollectionsHubsNavProps {
  marketingCollections: CollectionsHubsNav_marketingCollections
}

export const CollectionsHubsNav: FC<CollectionsHubsNavProps> = props => {
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
          to={`/collection/${hub.slug}`}
          src={placeholderImage}
          ratio={[0.49]}
          title={<Serif size="4t">{hub.title}</Serif>}
          key={hub.id}
        />
      ))}
    </CSSGrid>
  )
}

// This is a temporary image URL until we get real data.
export const placeholderImage =
  "https://d7hftxdivxxvm.cloudfront.net/?resize_to=fill&width=357&height=175&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FeF_qAORql7lSnD2BwbFOYg%2Flarge.jpg"

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
