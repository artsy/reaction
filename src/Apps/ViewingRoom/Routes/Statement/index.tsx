import React from "react"
import { Box, Spacer, Button, Join } from "@artsy/palette"
import { useRouter } from "Artsy/Router/useRouter"
import { ViewingRoomWorks } from "./Components/ViewingRoomWorks"
import { ViewingRoomIntro } from "./Components/ViewingRoomIntro"
import { ViewingRoomStatements } from "./Components/ViewingRoomStatements"
import { ViewingRoomBottomImage } from "./Components/ViewingRoomBottomImage"

const StatementRoute: React.FC = props => {
  const { router } = useRouter()

  return (
    <Box>
      <Box width={["100%", "50%"]} px={[2, 0]} m="auto">
        <Join separator={<Spacer my={4} />}>
          <ViewingRoomIntro />
          <ViewingRoomWorks />
          <Button
            onClick={() => router.push("/viewing-room/works")}
            width="100%"
            size="large"
          >
            View works
          </Button>
          <ViewingRoomStatements />
          <ViewingRoomBottomImage />
        </Join>
      </Box>
      <Spacer my={4} />
    </Box>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default StatementRoute
