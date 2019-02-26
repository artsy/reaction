import { Box, Sans, Spacer } from "@artsy/palette"
import { Carousel } from "Components/v2"
import React, { SFC } from "react"
import { ArtistCollectionEntity } from "./CollectionEntity"

interface ArtistCollectionsRailProps {
  collections: any
}

export const ArtistCollectionsRail: SFC<ArtistCollectionsRailProps> = ({
  collections,
}) => {
  return (
    <Box>
      <Sans size="3" weight="medium">
        Browse by series
      </Sans>
      <Spacer pb={1} />

      <Carousel
        height={200}
        settings={{
          arrows: true,
        }}
        data={collections as object[]}
        render={slide => {
          return <ArtistCollectionEntity collection={slide} />
        }}
      />
    </Box>
  )
}

// CarouselArrow
// min-height: 130px;
// align-self: flex-start;
