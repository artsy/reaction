import React from "react"
import { Flex, Box, Image, Sans, Button, Spacer } from "@artsy/palette"
import { useRouter } from "Artsy/Router/useRouter"
import { createFragmentContainer, graphql } from "react-relay"

import { ViewingRoomWorks_viewingRoom } from "__generated__/ViewingRoomWorks_viewingRoom.graphql"
import { RouterLink } from "Artsy/Router/RouterLink"
import { LinkPropsSimple } from "found"

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
  } = useRouter()

  const linkProps: LinkPropsSimple = {
    to: `/viewing-room/${slug}/works`,
    onClick: scrollToTabBar,
  }

  return (
    <>
      <Flex>
        {edges.map(({ node: artwork }) => {
          return (
            <ArtworkItem
              key={artwork.internalID}
              linkProps={linkProps}
              {...artwork}
            />
          )
        })}
      </Flex>
      <Spacer my={4} />
      <RouterLink {...linkProps}>
        <Button size="large" width="100%">
          View works
        </Button>
      </RouterLink>
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
  linkProps: LinkPropsSimple
}

const ArtworkItem: React.FC<ArtworkNode> = ({
  artistNames,
  date,
  imageUrl,
  title,
  linkProps,
}) => {
  return (
    <RouterLink {...linkProps} style={{ textDecoration: "none", width: "50%" }}>
      <Box pl={1}>
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
    </RouterLink>
  )
}

const scrollToTabBar = () => {
  const element = document.getElementById("viewingRoomTabBarAnchor")
  const top = element.getBoundingClientRect().top + window.pageYOffset - 80
  window.scrollTo({ top, behavior: "auto" })
}
