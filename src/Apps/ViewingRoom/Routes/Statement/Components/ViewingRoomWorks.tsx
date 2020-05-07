import React from "react"
import { Flex, Box, Image, Sans } from "@artsy/palette"
import { useRouter } from "Artsy/Router/useRouter"

export const ViewingRoomWorks = props => {
  return (
    <Flex>
      <ArtworkItem />
      <ArtworkItem />
    </Flex>
  )
}

const ArtworkItem: React.FC = props => {
  const { router } = useRouter()

  return (
    <Box width="50%" pl={1} onClick={() => router.push("/viewing-room/works")}>
      <Box>
        <Image
          width="100%"
          src="https://user-images.githubusercontent.com/236943/81243268-3bed7080-8fc4-11ea-9e5a-eff8038928ec.png"
        />
      </Box>
      <Box>
        <Sans size="3">Christine Sun Kim</Sans>
      </Box>
      <Box style={{ textOverflow: "ellipsis" }}>
        <Sans size="3" color="black60">
          Tete de Mort et Livre, 1946, 1979-1982
        </Sans>
      </Box>
    </Box>
  )
}
