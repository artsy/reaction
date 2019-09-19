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
      {props.marketingCollections.map((hub, i) => (
        <ImageLink
          to={`/collection/${hub.slug}`}
          src={placeholderImages[i]}
          ratio={[0.49]}
          title={<Serif size="4t">{hub.title}</Serif>}
          key={hub.id}
        />
      ))}
    </CSSGrid>
  )
}

// These are temporary image URLs until we get real data.
export const placeholderImages = [
  "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=357&height=175&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FAqIUxe69SL6dNmFSF7XgDg%2Flarge.jpg",
  "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=357&height=175&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Faes0eLUVKs0oksAzap8NNw%2Flarge.jpg",
  "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=357&height=175&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FxsGtXP5r6O6DkfUcBIjprQ%2Flarge.jpg",
  "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=357&height=175&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FWtPYZyT08x5_vMCy77bmWw%2Flarge.jpg",
  "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=357&height=175&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FMK--4uZxx3BPS6ychTsW8A%2Flarge.jpg",
  "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=357&height=175&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F8gwEs3lxHBSpvaITesYRXw%2Flarge.jpg",
]

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
