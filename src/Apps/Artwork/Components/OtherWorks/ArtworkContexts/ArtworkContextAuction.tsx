import { ArtworkContextAuction_artwork } from "__generated__/ArtworkContextAuction_artwork.graphql"
import { ArtworkContextAuctionQuery } from "__generated__/ArtworkContextAuctionQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import { Join, Spacer } from "@artsy/palette"
import {
  ArtistArtworkGrid,
  AuctionArtworkGrid,
  RelatedWorksArtworkGrid,
} from "./ArtworkGrids"

interface ArtworkContextAuctionProps {
  /** The artworkSlug to query */
  artworkSlug: string
  /** Used to exclude the current work from the currently-shown work from grid */
  artworkID: string
  /** If the artwork  */
  isClosed: boolean
}

export const ArtworkContextAuctionQueryRenderer: React.SFC<
  ArtworkContextAuctionProps
> = ({ artworkSlug, artworkID, isClosed }) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<ArtworkContextAuctionQuery>
            environment={relayEnvironment}
            variables={{
              artworkSlug,
              excludeArtworkIDs: [artworkID],
              isClosed,
            }}
            query={graphql`
              query ArtworkContextAuctionQuery(
                $artworkSlug: String!
                $excludeArtworkIDs: [String!]
                $isClosed: Boolean!
              ) {
                artwork(id: $artworkSlug) {
                  ...ArtworkContextAuction_artwork
                    @arguments(
                      excludeArtworkIDs: $excludeArtworkIDs
                      isClosed: $isClosed
                    )
                }
              }
            `}
            render={renderWithLoadProgress(
              ArtworkContextAuctionFragmentContainer
            )}
          />
        )
      }}
    </ContextConsumer>
  )
}

export const ArtworkContextAuction: React.SFC<{
  artwork: ArtworkContextAuction_artwork
}> = props => {
  const isClosed = props.artwork.sale.is_closed

  if (!isClosed) {
    return <AuctionArtworkGrid artwork={props.artwork} />
  } else {
    return (
      <Join separator={<Spacer my={2} />}>
        <ArtistArtworkGrid artwork={props.artwork} />
        <RelatedWorksArtworkGrid />
      </Join>
    )
  }
}

export const ArtworkContextAuctionFragmentContainer = createFragmentContainer(
  ArtworkContextAuction,
  graphql`
    fragment ArtworkContextAuction_artwork on Artwork
      @argumentDefinitions(
        isClosed: { type: "Boolean" }
        excludeArtworkIDs: { type: "[String!]" }
      ) {
      sale {
        href
        is_closed
      }
      ...AuctionArtworkGrid_artwork
        @skip(if: $isClosed)
        @arguments(excludeArtworkIDs: $excludeArtworkIDs)

      ...ArtistArtworkGrid_artwork
        @include(if: $isClosed)
        @arguments(excludeArtworkIDs: $excludeArtworkIDs)

      # TODO:
      # ...RelatedArtworkGrid_artwork @include(if: $isClosed)
    }
  `
)
