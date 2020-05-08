import React from "react"
import { Box, Sans } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomPullQuote_viewingRoom } from "__generated__/ViewingRoomPullQuote_viewingRoom.graphql"

interface ViewingRoomPullQuoteProps {
  viewingRoom: ViewingRoomPullQuote_viewingRoom
}

const ViewingRoomPullQuote: React.FC<ViewingRoomPullQuoteProps> = ({
  viewingRoom: { pullQuote },
}) => {
  return (
    <Box>
      <Sans size="8" textAlign="center">
        {pullQuote}
      </Sans>
    </Box>
  )
}

export const ViewingRoomPullQuoteFragmentContainer = createFragmentContainer(
  ViewingRoomPullQuote,
  {
    viewingRoom: graphql`
      fragment ViewingRoomPullQuote_viewingRoom on ViewingRoom {
        pullQuote
      }
    `,
  }
)
