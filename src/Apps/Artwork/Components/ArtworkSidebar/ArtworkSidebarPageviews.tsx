import { Box, Flex, Sans } from "@artsy/palette"
import { ArtworkSidebarPageviews_artwork } from "__generated__/ArtworkSidebarPageviews_artwork.graphql"
import { ArtworkSidebarPageviewsQuery } from "__generated__/ArtworkSidebarPageviewsQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React, { SFC } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { PageviewsIcon } from "Styleguide/Elements/icons/Pageviews"

interface Props {
  artwork: ArtworkSidebarPageviews_artwork
}

export const ArtworkSidebarPageviews: SFC<Props> = props => {
  const { artwork } = props
  const { pageviews } = artwork

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
          {pageviews
            ? "This work is getting noticed!"
            : "You're one of the first to view this work"}
        </Sans>
        <Sans color="black60" size="2" weight="regular">
          {pageviews ? (
            <>
              It has been viewed <strong>{pageviews.toLocaleString()}</strong>{" "}
              times
            </>
          ) : (
            "Explore artwork details or ask a specialist to learn more"
          )}
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
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
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
            render={renderWithLoadProgress(
              ArtworkSidebarPageviewsFragmentContainer
            )}
          />
        )
      }}
    </ContextConsumer>
  )
}
