import { CSSGrid } from "@artsy/palette"
import { Serif } from "@artsy/palette"
import { CollectionsHubsHomepageNav_marketingCollections } from "__generated__/CollectionsHubsHomepageNav_marketingCollections.graphql"
import { placeholderImage } from "Components/v2/CollectionsHubsNav"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ImageLink } from "./ImageLink"

interface CollectionsHubsHomepageNavProps {
  marketingCollections: CollectionsHubsHomepageNav_marketingCollections
}

export const CollectionsHubsHomepageNav: FC<
  CollectionsHubsHomepageNavProps
> = props => {
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
          src={placeholderImage}
          alt={hub.title}
          title={<Serif size="4t">{hub.title}</Serif>}
          // subtitle={subtitle && <Serif size="2">{hub.subtitle}</Serif>}
          key={hub.id}
        />
      ))}
    </CSSGrid>
  )
}

export const CollectionsHubsHomepageNavFragmentContainer = createFragmentContainer(
  CollectionsHubsHomepageNav,
  {
    marketingCollections: graphql`
      fragment CollectionsHubsHomepageNav_marketingCollections on MarketingCollection
        @relay(plural: true) {
        id
        slug
        title
        thumbnail
      }
    `,
  }
)
