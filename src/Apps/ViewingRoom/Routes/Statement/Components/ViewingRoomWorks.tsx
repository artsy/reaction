import React from "react"
import { Flex, Box, Image, Sans } from "@artsy/palette"
import { useRouter } from "Artsy/Router/useRouter"
import { createFragmentContainer, graphql } from "react-relay"

import { ViewingRoomWorks_viewingRoom } from "__generated__/ViewingRoomWorks_viewingRoom.graphql"

interface ViewingRoomWorksProps {
  viewingRoom: ViewingRoomWorks_viewingRoom
}

const ViewingRoomWorks: React.FC<ViewingRoomWorksProps> = ({
  viewingRoom: {
    artworksConnection: { edges },
  },
}) => {
  return (
    <Flex>
      {edges.map(({ node: artwork }) => {
        return <ArtworkItem key={artwork.internalID} {...artwork} />
      })}
    </Flex>
  )
}

export const ViewingRoomWorksFragmentContainer = createFragmentContainer(
  ViewingRoomWorks,
  {
    viewingRoom: graphql`
      fragment ViewingRoomWorks_viewingRoom on ViewingRoom {
        artworksConnection {
          edges {
            node {
              internalID
              imageUrl
              artistNames
              title
              date
            }
          }
        }
      }
    `,
  }
)

type ArtworkNode = ViewingRoomWorksProps["viewingRoom"]["artworksConnection"]["edges"][0]["node"]

const ArtworkItem: React.FC<ArtworkNode> = ({
  imageUrl,
  artistNames,
  title,
  date,
}) => {
  const { router } = useRouter()

  return (
    <Box width="50%" pl={1} onClick={() => router.push("/viewing-room/works")}>
      <Box>
        <Image width="100%" src={imageUrl} />
      </Box>
      <Box>
        <Sans size="3">{artistNames}</Sans>
      </Box>
      <Box style={{ textOverflow: "ellipsis" }}>
        <Sans size="3" color="black60">
          {title}, {date}
        </Sans>
      </Box>
    </Box>
  )
}
