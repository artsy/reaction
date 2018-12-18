import { Join, Spacer } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import { ArtworkContextAuction_viewer } from "__generated__/ArtworkContextAuction_viewer.graphql"
import { ArtworkContextAuctionQuery } from "__generated__/ArtworkContextAuctionQuery.graphql"
import { OtherAuctions } from "Apps/Artwork/Components/OtherAuctions"
import { OtherWorksContextProps } from "Apps/Artwork/Components/OtherWorks"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { AuctionCardFragmentContainer as AuctionCard } from "Styleguide/Components/AuctionCard"

import {
  ArtistArtworkGrid,
  AuctionArtworkGrid,
  RelatedWorksArtworkGrid,
} from "Apps/Artwork/Components/OtherWorks/ArtworkGrids"

interface ArtworkContextAuctionProps extends OtherWorksContextProps {
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
                viewer {
                  ...ArtworkContextAuction_viewer
                    @arguments(
                      excludeArtworkIDs: $excludeArtworkIDs
                      isClosed: $isClosed
                      artworkSlug: $artworkSlug
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

export const ArtworkContextAuctionFragmentContainer = createFragmentContainer<{
  viewer: ArtworkContextAuction_viewer
}>(
  props => {
    const { artwork, sales } = props.viewer
    const isClosed = artwork.sale.is_closed

    const OtherAuctionsList = (
      <OtherAuctions>
        {sales.map(sale => {
          return <AuctionCard sale={sale} key={(sale as any).id} />
        })}
      </OtherAuctions>
    )

    if (!isClosed) {
      return (
        <Join separator={<Spacer my={6} />}>
          <AuctionArtworkGrid artwork={artwork} />
          {OtherAuctionsList}
        </Join>
      )
    } else {
      return (
        <Join separator={<Spacer my={6} />}>
          <ArtistArtworkGrid artwork={artwork} />
          <RelatedWorksArtworkGrid artwork={artwork} />
          {OtherAuctionsList}
        </Join>
      )
    }
  },
  graphql`
    fragment ArtworkContextAuction_viewer on Viewer
      @argumentDefinitions(
        isClosed: { type: "Boolean" }
        excludeArtworkIDs: { type: "[String!]" }
        artworkSlug: { type: "String!" }
      ) {
      artwork(id: $artworkSlug) {
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
        ...RelatedWorksArtworkGrid_artwork
      }
      sales(size: 4, sort: TIMELY_AT_NAME_ASC) {
        ...AuctionCard_sale
      }
    }
  `
)
