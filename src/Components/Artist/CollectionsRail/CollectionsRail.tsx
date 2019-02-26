import { Box, Flex, Sans, Spacer } from "@artsy/palette"
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
    <Box pb={3}>
      <Box>
        <Sans size="6">Browse by series</Sans>
        <Spacer mb={3} />
      </Box>
      <Carousel
        height={200}
        data={collections as object[]}
        render={slide => {
          return <ArtistCollectionEntity collection={slide} />
        }}
      />
    </Box>
  )
}

// {collections.map((collection, index) => {
//   const shouldAddPadding = index % 2 === 0
//   return (
//     <Box
//       width={["100%", "50%"]}
//       key={index}
//       pr={[0, shouldAddPadding ? 2 : 0]}
//     >
//       <ArtistCollectionEntity collection={collection} />
//     </Box>
//   )
// })}
