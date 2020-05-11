import React from "react"
import { AppContainer } from "Apps/Components/AppContainer"
import { Box } from "@artsy/palette"
import { ViewingRoomHeaderFragmentContainer as ViewingRoomHeader } from "./Components/ViewingRoomHeader"
import { ViewingRoomTabBar } from "./Components/ViewingRoomTabBar"
import { createFragmentContainer, graphql } from "react-relay"

import { ViewingRoomApp_viewingRoom } from "__generated__/ViewingRoomApp_viewingRoom.graphql"
import { ViewingRoomMeta } from "./Components/ViewingRoomMeta"

interface ViewingRoomAppProps {
  children: React.ReactNode
  viewingRoom: ViewingRoomApp_viewingRoom
}

const ViewingRoomApp: React.FC<ViewingRoomAppProps> = ({
  children,
  viewingRoom,
}) => {
  return (
    <>
      <ViewingRoomMeta />
      <AppContainer maxWidth="100%">
        <ViewingRoomHeader viewingRoom={viewingRoom} />
        <Box my={3}>
          <ViewingRoomTabBar />
        </Box>
        {children}
      </AppContainer>
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(ViewingRoomApp, {
  viewingRoom: graphql`
    fragment ViewingRoomApp_viewingRoom on ViewingRoom {
      ...ViewingRoomHeader_viewingRoom
    }
  `,
})
