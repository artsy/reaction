import React from "react"
import { Box, Sans, Image } from "@artsy/palette"

export const ViewingRoomBottomImage: React.FC = props => {
  return (
    <Box>
      <Box width="100%">
        <Image
          width="100%"
          src="https://user-images.githubusercontent.com/236943/81243273-3d1e9d80-8fc4-11ea-8226-eef95847ca2d.png"
        />
      </Box>
      <Box>
        <Sans size="2" color="black60">
          The artist in her Berlin apartment.
        </Sans>
      </Box>
    </Box>
  )
}
