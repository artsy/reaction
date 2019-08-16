import { CSSGrid } from "@artsy/palette"
import { CollectionsHubsNav_marketingCollections } from "__generated__/CollectionsHubsNav_marketingCollections.graphql"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { AutoScalingImageLink } from "./AutoScalingImageLink"

interface CollectionsHubsNavProps {
  marketingCollections: CollectionsHubsNav_marketingCollections
}

// largest sized image at each breakpoint:
// xs: 346x216 ~= 1.6 aspect ratio
// sm: 254x159 ~= 1.6 aspect ratio
// md: 138x86 ~= 1.6 aspect ratio
// lg/xl: 168x105 = 1.6 aspect ratio
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
        <AutoScalingImageLink
          href={`/collection/${hub.slug}`}
          imageUrl={hub.thumbnail || plainWhitePixel}
          key={hub.id}
          fontSize={["5t", "5t", "4t", "5t"]}
          maxWidth={346}
          maxHeight={216}
        >
          {hub.title}
        </AutoScalingImageLink>
      ))}
    </CSSGrid>
  )
}

const plainWhitePixel =
  "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="

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
