import React from "react"

import { Box } from "@artsy/palette"
import { ViewingRoomCarousel } from "./Components/ViewingRoomCarousel"
import { ViewingRoomArtworkDetails } from "./Components/ViewingRoomArtworkDetails"

interface WorksRouteProps {}

const WorksRoute: React.FC<WorksRouteProps> = props => {
  return (
    <Box>
      <ViewingRoomCarousel />
      <Box mt={2} mb={4} px={[2, 0]}>
        <ViewingRoomArtworkDetails />
      </Box>
    </Box>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default WorksRoute
