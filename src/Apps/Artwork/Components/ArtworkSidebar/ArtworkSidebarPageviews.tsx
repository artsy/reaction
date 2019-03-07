import { Box, Flex, PageviewsIcon, Sans } from "@artsy/palette"
import { ArtworkSidebarPageviews_artwork } from "__generated__/ArtworkSidebarPageviews_artwork.graphql"
import { ArtworkSidebarPageviewsQuery } from "__generated__/ArtworkSidebarPageviewsQuery.graphql"
import { SystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React, { SFC, useContext } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

interface Props {
  artwork: ArtworkSidebarPageviews_artwork
}

export const ArtworkSidebarPageviews: SFC<Props> = props => {
  const { artwork } = props
  const { pageviews } = artwork

  if (!pageviews) {
    return null
  }

  // TODO: Figure out why `jest` tests don't play nicely with this icon.
  return (
    <Flex>
      {typeof jest === "undefined" && (
        <Box mt={0.5}>
          <PageviewsIcon width="21" height="21" />
        </Box>
      )}
      <Box ml={2}>
        <Sans weight="medium" size="2">
          This work is getting noticed!
        </Sans>
        <Sans color="black60" size="2" weight="regular">
          It has been viewed <strong>{pageviews.toLocaleString()} times</strong>{" "}
          this week
        </Sans>
      </Box>
    </Flex>
  )
}

export const ArtworkSidebarPageviewsFragmentContainer = createFragmentContainer(
  ArtworkSidebarPageviews,
  graphql`
    fragment ArtworkSidebarPageviews_artwork on Artwork {
      id
      pageviews
    }
  `
)

export const ArtworkSidebarPageviewsQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <QueryRenderer<ArtworkSidebarPageviewsQuery>
      environment={relayEnvironment}
      variables={{ artworkID }}
      query={graphql`
        query ArtworkSidebarPageviewsQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...ArtworkSidebarPageviews_artwork
          }
        }
      `}
      render={renderWithLoadProgress(ArtworkSidebarPageviewsFragmentContainer)}
    />
  )
}
