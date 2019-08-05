import { CollectionsHubsNav_marketingCollections } from "__generated__/CollectionsHubsNav_marketingCollections.graphql"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { ImageLink } from "./ImageLink"

interface CollectionsHubsNavProps {
  marketingCollections: CollectionsHubsNav_marketingCollections
}

export const CollectionsHubsNav: SFC<CollectionsHubsNavProps> = props => {
  return (
    <NavWrapper>
      {props.marketingCollections.map(hub => (
        <ImageLink
          href={`/collection/${hub.slug}`}
          imageUrl={hub.thumbnail || "http://placekitten.com/136/85"}
          width={[132, 132, 120, 136]}
          height={[83, 83, 74, 85]}
          mr={2}
          key={hub.id}
        >
          {hub.title}
        </ImageLink>
      ))}
    </NavWrapper>
  )
}

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

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
