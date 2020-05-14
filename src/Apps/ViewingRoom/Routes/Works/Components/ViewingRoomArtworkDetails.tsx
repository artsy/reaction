import React from "react"
import { Box, Button, Sans, Serif } from "@artsy/palette"
import { ViewingRoomArtworkDetails_artwork } from "__generated__/ViewingRoomArtworkDetails_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "Artsy/Router/RouterLink"

interface ViewingRoomArtworkDetailsProps {
  artwork: ViewingRoomArtworkDetails_artwork
}

export const ViewingRoomArtworkDetails: React.FC<ViewingRoomArtworkDetailsProps> = ({
  artwork: { artistNames, title, date, href, additionalInformation },
}) => {
  return (
    <Box maxWidth={["100%", 470]} m="auto">
      <Box>
        <Sans size="3">{artistNames}</Sans>
      </Box>

      <Box style={{ textOverflow: "ellipsis" }}>
        <Sans size="3" color="black60">
          {title}, {date}
        </Sans>
      </Box>

      <RouterLink to={href}>
        <Button width="100%" size="large" my={2}>
          Buy
        </Button>
      </RouterLink>

      <Serif size={["4", "5"]}>{additionalInformation}</Serif>
    </Box>
  )
}

export const ViewingRoomArtworkDetailsFragmentContainer = createFragmentContainer(
  ViewingRoomArtworkDetails,
  {
    artwork: graphql`
      fragment ViewingRoomArtworkDetails_artwork on Artwork {
        id
        additionalInformation
        artistNames
        title
        date
        href
      }
    `,
  }
)
