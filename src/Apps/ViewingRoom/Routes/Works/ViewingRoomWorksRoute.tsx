import React from "react"
import { Box, Join, Spacer } from "@artsy/palette"
import { ViewingRoomCarouselFragmentContainer as ViewingRoomCarousel } from "./Components/ViewingRoomCarousel"
import { ViewingRoomArtworkDetailsFragmentContainer as ViewingRoomArtworkDetails } from "./Components/ViewingRoomArtworkDetails"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomWorksRoute_viewingRoom } from "__generated__/ViewingRoomWorksRoute_viewingRoom.graphql"

interface WorksRouteProps {
  viewingRoom: ViewingRoomWorksRoute_viewingRoom
}

const ViewingRoomWorksRoute: React.FC<WorksRouteProps> = ({ viewingRoom }) => {
  return (
    <Join separator={<Spacer my={4} />}>
      {viewingRoom.artworksConnection.edges.map(({ node: artwork }) => {
        return (
          <Box key={artwork.internalID}>
            <ViewingRoomCarousel artwork={artwork} />
            <Box mt={2} mb={4} px={[2, 0]}>
              <ViewingRoomArtworkDetails artwork={artwork} />
            </Box>
          </Box>
        )
      })}
    </Join>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(ViewingRoomWorksRoute, {
  viewingRoom: graphql`
    fragment ViewingRoomWorksRoute_viewingRoom on ViewingRoom {
      artworksConnection {
        edges {
          node {
            internalID
            ...ViewingRoomCarousel_artwork
            ...ViewingRoomArtworkDetails_artwork
          }
        }
      }
    }
  `,
})
