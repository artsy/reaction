import { CollectionsHubsNav_marketingHubCollections } from "__generated__/CollectionsHubsNav_marketingHubCollections.graphql"
import React, { SFC } from "react"
// import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { marketingHubCollections } from "./_fixtures_/collectionsHubs"
import { ImageLink } from "./ImageLink"

interface CollectionsHubsNavProps {
  marketingHubCollections: CollectionsHubsNav_marketingHubCollections
}

export const CollectionsHubsNav: SFC<CollectionsHubsNavProps> = props => {
  return (
    <NavWrapper>
      {props.marketingHubCollections.map(hub => (
        <ImageLink href={`/collection/${hub.slug}`} imageUrl={hub.thumbnail}>
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

export const CollectionsHubsNavFragmentContainer = () => {
  return (
    <CollectionsHubsNav marketingHubCollections={marketingHubCollections} />
  )
}
// export const CollectionsHubsNavFragmentContainer = createFragmentContainer(
//   CollectionsHubsNav,
//   {
//     marketingHubCollections: graphql`
//       fragment CollectionsHubsNav_marketingHubCollections on MarketingCollection
//         @relay(plural: true) {
//         id
//         slug
//         title
//         thumbnail
//       }
//     `,
//   }
// )
