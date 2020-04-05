import { Box, Flex } from "@artsy/palette"
import React from "react"
import { FeaturedContentLink, FeaturedLinkType } from "./Feature"

interface FeaturedArtistsProps {
  artists: [FeaturedLinkType]
}

export const FeaturedArtists: React.FC<FeaturedArtistsProps> = props => {
  return (
    <Flex
      flexDirection="row"
      justifyContent={["center", "space-between"]}
      flexWrap="wrap"
      maxWidth="720px"
      style={{ margin: "0 auto" }}
    >
      {props.artists.map((artist, index) => {
        return (
          <Box
            minWidth="300px"
            maxWidth="350px"
            mb={2}
            mx={[1, 0]}
            key={`featured-artist-${index}`}
          >
            <FeaturedContentLink size="medium" {...artist} />
          </Box>
        )
      })}
    </Flex>
  )
}
