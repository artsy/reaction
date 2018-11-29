import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import { ArtworkContextAuction_artwork } from "__generated__/ArtworkContextAuction_artwork.graphql"
import { ArtworkContextAuctionQuery } from "__generated__/ArtworkContextAuctionQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"

import {
  ArtistArtworkGrid,
  AuctionArtworkGrid,
  RelatedWorksArtworkGrid,
} from "./ArtworkGrids"

interface ArtworkContextAuctionProps {
  /** The artworkID to query */
  artworkID: string
  /** Used to exclude the current work from the currently-shown work from grid */
  artworkMongoID: string
  /** If the artwork  */
  isClosed: boolean
}

export const ArtworkContextAuctionQueryRenderer: React.SFC<
  ArtworkContextAuctionProps
> = ({ artworkID, artworkMongoID, isClosed }) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<ArtworkContextAuctionQuery>
            environment={relayEnvironment}
            variables={{
              artworkID,
              excludeArtworkIDs: [artworkMongoID],
              isClosed,
            }}
            query={graphql`
              query ArtworkContextAuctionQuery(
                $artworkID: String!
                $excludeArtworkIDs: [String!]
                $isClosed: Boolean!
              ) {
                artwork(id: $artworkID) {
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
      <>
        <ArtistArtworkGrid artwork={props.artwork} />
        <RelatedWorksArtworkGrid />
      </>
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

      ...ArtistArtworkGrid_artwork @include(if: $isClosed)
      # TODO:
      # ...RelatedArtworkGrid_artwork @include(if: $isClosed)
    }
  `
)
