import { Box, Sans, Spacer } from "@artsy/palette"
import { ArrowButton, Carousel } from "Components/v2"
import React, { SFC } from "react"
import styled from "styled-components"
import { ArtistCollectionEntity } from "./CollectionEntity"

interface ArtistCollectionsRailProps {
  collections?: any // TODO: add typings when Kaws schema supports all fields
}

export const ArtistCollectionsRail: SFC<ArtistCollectionsRailProps> = ({
  collections,
}) => {
  if (collections) {
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
          // TODO: add typings when Kaws schema supports all fields
          data={collections as object[]}
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
