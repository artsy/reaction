import React from "react"
import { Box, Spacer, Button, Join } from "@artsy/palette"
import { useRouter } from "Artsy/Router/useRouter"
import { ViewingRoomWorksFragmentContainer as ViewingRoomWorks } from "./Components/ViewingRoomWorks"
import { ViewingRoomIntroFragmentContainer as ViewingRoomIntro } from "./Components/ViewingRoomIntro"
import { ViewingRoomSubsectionsFragmentContainer as ViewingRoomSubsections } from "./Components/ViewingRoomSubsections"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomStatementRoute_viewingRoom } from "__generated__/ViewingRoomStatementRoute_viewingRoom.graphql"

interface ViewingRoomStatementRouteProps {
  viewingRoom: ViewingRoomStatementRoute_viewingRoom
}

const StatementRoute: React.FC<ViewingRoomStatementRouteProps> = ({
  viewingRoom,
}) => {
  const {
    match: {
      params: { slug },
    },
    router,
  } = useRouter()

  return (
    <Box>
      <Box width={["100%", "50%"]} px={[2, 0]} m="auto">
        <Join separator={<Spacer my={4} />}>
          <ViewingRoomIntro viewingRoom={viewingRoom} />
          <ViewingRoomWorks viewingRoom={viewingRoom} />
          <Button
            onClick={() => router.push(`/viewing-room/${slug}/works`)}
            width="100%"
            size="large"
          >
            View works
          </Button>
          <ViewingRoomSubsections viewingRoom={viewingRoom} />
        </Join>
      </Box>
      <Spacer my={4} />
    </Box>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(StatementRoute, {
  viewingRoom: graphql`
    fragment ViewingRoomStatementRoute_viewingRoom on ViewingRoom {
      ...ViewingRoomIntro_viewingRoom
      ...ViewingRoomWorks_viewingRoom
      ...ViewingRoomSubsections_viewingRoom
    }
  `,
})
