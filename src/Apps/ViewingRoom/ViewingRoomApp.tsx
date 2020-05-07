import React from "react"
import { AppContainer } from "Apps/Components/AppContainer"
import { Box } from "@artsy/palette"
import { ViewingRoomHeader } from "./Components/ViewingRoomHeader"
import { ViewingRoomTabBar } from "./Components/ViewingRoomTabBar"

interface ViewingRoomAppProps {
  children: React.ReactNode
}

const ViewingRoomApp: React.FC<ViewingRoomAppProps> = ({ children }) => {
  return (
    <AppContainer maxWidth="100%">
      <ViewingRoomHeader />
      <Box my={3}>
        <ViewingRoomTabBar />
      </Box>
      {children}
    </AppContainer>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default ViewingRoomApp
