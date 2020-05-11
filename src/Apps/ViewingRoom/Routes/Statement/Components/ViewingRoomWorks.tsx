import React from "react"
import { Flex, Box, Image, Sans, Button, Spacer } from "@artsy/palette"
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
  const {
    match: {
      params: { slug },
    },
    router,
  } = useRouter()

  const navigateToWorks = () => {
    router.push(`/viewing-room/${slug}/works`)
    scrollToTabBar()
  }

  return (
    <>
      <Flex>
        {edges.map(({ node: artwork }) => {
          return (
            <ArtworkItem
              key={artwork.internalID}
              onClick={navigateToWorks}
              {...artwork}
            />
          )
        })}
      </Flex>
      <Spacer my={4} />
      <Button onClick={navigateToWorks} size="large" width="100%">
        View works
      </Button>
    </>
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

type ArtworkNode = ViewingRoomWorksProps["viewingRoom"]["artworksConnection"]["edges"][0]["node"] & {
  onClick: () => void
}

const ArtworkItem: React.FC<ArtworkNode> = ({
  artistNames,
  date,
  imageUrl,
  onClick,
  title,
}) => {
  return (
    <Box
      onClick={onClick}
      width="50%"
      pl={1}
      style={{
        cursor: "pointer",
      }}
    >
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

const scrollToTabBar = () => {
  const element = document.getElementById("viewingRoomTabBarAnchor")
  const top = element.getBoundingClientRect().top + window.pageYOffset - 80
  window.scrollTo({ top, behavior: "auto" })
}
