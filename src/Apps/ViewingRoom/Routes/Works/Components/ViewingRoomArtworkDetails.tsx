import React from "react"
import { Box, Sans, Button, Serif } from "@artsy/palette"

export const ViewingRoomArtworkDetails = props => {
  return (
    <Box width={["100%", "50%"]} m="auto">
      <Box>
        <Sans size="3">Christine Sun Kim</Sans>
      </Box>

      <Box style={{ textOverflow: "ellipsis" }}>
        <Sans size="3" color="black60">
          Fleurs (for UCLA) (Bloch 1297; Mourlot 351), 1961
        </Sans>
      </Box>

      <Button width="100%" size="large" my={2}>
        Buy
      </Button>

      {/* Artwork Description */}
      <Serif size={["4", "5"]}>
        Inspired by meme formats, the artist creates pie charts that cleverly
        address different types of discrimination she faces as a deaf person.
        Here, she offers answers to questions like “Why does your hearing
        partner sign?” and “Why do you watch shows with closed captions?”
      </Serif>
    </Box>
  )
}
