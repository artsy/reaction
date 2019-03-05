import { Box, Sans, Spacer } from "@artsy/palette"
import { ArtistCollectionsRail_collections } from "__generated__/ArtistCollectionsRail_collections.graphql"
import { ArrowButton, Carousel } from "Components/v2"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { ArtistCollectionEntityFragmentContainer as ArtistCollectionEntity } from "./ArtistCollectionEntity"

interface ArtistCollectionsRailProps {
  collections: ArtistCollectionsRail_collections
}

export const ArtistCollectionsRail: SFC<ArtistCollectionsRailProps> = ({
  collections,
}) => {
  if (collections.length > 3) {
    return (
      <RailWrapper>
        <Sans size="3" weight="medium">
          Browse by series
        </Sans>
        <Spacer pb={1} />

        <Carousel
          height={200}
          settings={{
            slidesToScroll: 1,
          }}
          data={collections as object[]} // type required by slider
          render={slide => {
            return <ArtistCollectionEntity collection={slide} />
          }}
        />
      </RailWrapper>
    )
  } else {
    return null
  }
}

const RailWrapper = styled(Box)`
  ${ArrowButton} {
    min-height: 130px;
    align-self: flex-start;
  }
`

export const ArtistCollectionsRailFragmentContainer = createFragmentContainer(
  ArtistCollectionsRail,
  graphql`
    fragment ArtistCollectionsRail_collections on MarketingCollection
      @relay(plural: true) {
      ...ArtistCollectionEntity_collection
    }
  `
)
