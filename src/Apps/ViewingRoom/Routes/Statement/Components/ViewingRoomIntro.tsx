import React from "react"
import { Box, Serif } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomIntro_viewingRoom } from "__generated__/ViewingRoomIntro_viewingRoom.graphql"

interface ViewingRoomIntroProps {
  viewingRoom: ViewingRoomIntro_viewingRoom
}

const ViewingRoomIntro: React.FC<ViewingRoomIntroProps> = ({
  viewingRoom: { introStatement },
}) => {
  return (
    <Box>
      <Serif size={["4", "5"]}>{introStatement}</Serif>
    </Box>
  )
}

export const ViewingRoomIntroFragmentContainer = createFragmentContainer(
  ViewingRoomIntro,
  {
    viewingRoom: graphql`
      fragment ViewingRoomIntro_viewingRoom on ViewingRoom {
        introStatement
      }
    `,
  }
)
