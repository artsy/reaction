import React from "react"
import { Box, Button, Flex, Image, Sans, Spacer } from "@artsy/palette"
import { useRouter } from "Artsy/Router/useRouter"
import { createFragmentContainer, graphql } from "react-relay"

import { ViewingRoomWorks_viewingRoom } from "__generated__/ViewingRoomWorks_viewingRoom.graphql"
import { RouterLink } from "Artsy/Router/RouterLink"
import { LinkPropsSimple } from "found"
import { AnalyticsSchema, useTracking } from "Artsy"

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

  const tracking = useTracking()

  const linkProps: LinkPropsSimple = {
    to: `/viewing-room/${slug}/works`,
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
      <RouterLink
        {...linkProps}
        data-test="viewingRoomWorksButton"
        onClick={() => {
          scrollToTabBar()
          tracking.trackEvent({
            action_type: AnalyticsSchema.ActionType.ClickedArtworkGroup,
            context_module:
              AnalyticsSchema.ContextModule.ViewingRoomArtworkRail,
            subject: AnalyticsSchema.Subject.ViewWorks,
            destination_path: linkProps.to as string,
          })
        }}
      >
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
  const tracking = useTracking()

  return (
    <RouterLink
      {...linkProps}
      style={{ textDecoration: "none", width: "50%" }}
      onClick={() => {
        scrollToTabBar()
        tracking.trackEvent({
          action_type: AnalyticsSchema.ActionType.ClickedArtworkGroup,
          context_module: AnalyticsSchema.ContextModule.ViewingRoomArtworkRail,
          subject: AnalyticsSchema.Subject.ArtworkThumbnail,
          destination_path: linkProps.to as string,
        })
      }}
    >
      <Box pl={1}>
        <Box>
          <Image width="100%" src={imageUrl} />
        </Box>
        <Box>
          <Sans size="3">{artistNames}</Sans>
        </Box>
        <Box style={{ textOverflow: "ellipsis" }}>
          <Sans size="3" color="black60">
            {[title, date].filter(s => s).join(", ")}
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
