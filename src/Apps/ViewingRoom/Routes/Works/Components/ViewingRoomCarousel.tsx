import React from "react"
import { Flex, ChevronIcon, Box, Image, ProgressBar } from "@artsy/palette"

export const ViewingRoomCarousel = () => {
  return (
    <Box width="100%">
      <Flex position="relative" height={550} my={2}>
        <Arrow direction="left" />

        <Flex>
          <Box>
            <Image
              height={550}
              src="https://user-images.githubusercontent.com/236943/81243991-15303980-8fc6-11ea-949e-fb34979a11ea.png"
            />
          </Box>
          <Box>
            <Image
              height={550}
              src="https://user-images.githubusercontent.com/236943/81244007-1a8d8400-8fc6-11ea-95e3-3f49d49c60eb.png"
            />
          </Box>
          <Box>
            <Image
              height={550}
              src="https://user-images.githubusercontent.com/236943/81243991-15303980-8fc6-11ea-949e-fb34979a11ea.png"
            />
          </Box>
          <Box>
            <Image
              height={550}
              src="https://user-images.githubusercontent.com/236943/81244007-1a8d8400-8fc6-11ea-95e3-3f49d49c60eb.png"
            />
          </Box>
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

const Arrow: React.FC<{ direction: "left" | "right" }> = ({ direction }) => {
  const position = { [direction]: 0 }

  return (
    <Flex
      position="absolute"
      width={50}
      height="100%"
      justifyContent="center"
      alignItems="center"
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
