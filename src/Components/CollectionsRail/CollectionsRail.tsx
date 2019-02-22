import { Box, Flex, Sans, Spacer } from "@artsy/palette"
import { CollectionsRail_collections } from "__generated__/CollectionsRail_collections.graphql"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

import { pMedia } from "Components/Helpers"
import { CollectionEntityFragmentContainer as CollectionEntity } from "./Collection"

interface CollectionRailsProps {
  collections: CollectionsRail_collections
}

/**
 *
 * TODO: Replace Helper Media with palette Media when a/b test closes.
 *
 */
const RailsWrapper = styled(Flex)`
  width: 100%;
  max-width: 1250px;
  margin: 0 auto;
  flex-direction: column;
  ${pMedia.xl`
    padding: 40px;
  `};
  ${pMedia.lg`
    padding: 40px;
  `};
  ${pMedia.xs`
    padding: 40px 30px;
  `};
`

export const CollectionsRail: SFC<CollectionRailsProps> = ({ collections }) => {
  return (
    <RailsWrapper pb={3}>
      <Sans size="6">Shop artworks from curated collections</Sans>
      <Spacer mb={3} />
      <Flex flexWrap="wrap">
        {collections.map((collection, index) => {
          const shouldAddPadding = index % 2 === 0
          return (
            <Box
              width={["100%", "50%"]}
              key={index}
              pr={[0, shouldAddPadding ? 2 : 0]}
            >
              <CollectionEntity collection={collection} />
            </Box>
          )
        })}
      </Flex>
    </RailsWrapper>
  )
}

export const CollectionsRailFragmentContainer = createFragmentContainer(
  CollectionsRail,
  graphql`
    fragment CollectionsRail_collections on MarketingCollection
      @relay(plural: true) {
      ...CollectionEntity_collection
    }
  `
)
