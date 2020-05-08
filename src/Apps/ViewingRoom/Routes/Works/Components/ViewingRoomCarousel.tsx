import React from "react"
import { Flex, ChevronIcon, Box, Image, ProgressBar } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"

import { ViewingRoomCarousel_artwork } from "__generated__/ViewingRoomCarousel_artwork.graphql"

interface ViewingRoomCarouselProps {
  artwork: ViewingRoomCarousel_artwork
}

const ViewingRoomCarousel: React.FC<ViewingRoomCarouselProps> = ({
  artwork: { images },
}) => {
  return (
    <Box width="100%">
      <Flex position="relative" height={550} my={2}>
        <Arrow direction="left" />

        <Flex>
          {images.map(({ internalID, imageHref }) => {
            return (
              <Box key={internalID}>
                <Image height={550} src={imageHref} />
              </Box>
            )
          })}
        </Flex>

        <Arrow direction="right" />
      </Flex>

      <Box>
        <Box width="50%" m="auto">
          <ProgressBar percentComplete={25} highlight="black100" />
        </Box>
      </Box>
    </Box>
  )
}

export const ViewingRoomCarouselFragmentContainer = createFragmentContainer(
  ViewingRoomCarousel,
  {
    artwork: graphql`
      fragment ViewingRoomCarousel_artwork on Artwork {
        images {
          internalID
          imageHref: url(version: ["large"])
        }
      }
    `,
  }
)

const Arrow: React.FC<{ direction: "left" | "right" }> = ({ direction }) => {
  const position = { [direction]: 0 }

  return (
    <Flex
      position="absolute"
      width={50}
      height="100%"
      justifyContent="center"
      alignItems="center"
      display={["none", "inherit"]}
      style={{
        backgroundColor: "#ffffff95",
        cursor: "pointer",
        ...position,
      }}
    >
      <ChevronIcon direction={direction} />
    </Flex>
  )
}
