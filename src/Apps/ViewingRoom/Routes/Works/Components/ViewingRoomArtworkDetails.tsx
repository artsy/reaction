import React from "react"
import { Box, Button, Sans, Serif } from "@artsy/palette"
import { ViewingRoomArtworkDetails_artwork } from "__generated__/ViewingRoomArtworkDetails_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "Artsy/Router/RouterLink"

interface ViewingRoomArtworkDetailsProps {
  artwork: ViewingRoomArtworkDetails_artwork
}

export const ViewingRoomArtworkDetails: React.FC<ViewingRoomArtworkDetailsProps> = ({
  artwork: { artistNames, title, date, href, description },
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

      <Serif size={["4", "5"]}>
        {/* FIXME: Populate description in test data */}
        {description ||
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
      </Serif>
    </Box>
  )
}

export const ViewingRoomArtworkDetailsFragmentContainer = createFragmentContainer(
  ViewingRoomArtworkDetails,
  {
    artwork: graphql`
      fragment ViewingRoomArtworkDetails_artwork on Artwork {
        id
        artistNames
        title
        date
        description
        href
      }
    `,
  }
)
