import { AuctionArtworkGrid_artwork } from "__generated__/AuctionArtworkGrid_artwork.graphql"
import { withContext } from "Artsy/SystemContext"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../../Header"

export const AuctionArtworkGridFragmentContainer = createFragmentContainer<{
  artwork: AuctionArtworkGrid_artwork
}>(
  withContext(
    ({
      artwork: {
        sale: { artworksConnection, href },
      },
      mediator,
    }) => {
      return (
        <>
          <Header
            title="Other works from the auction"
            buttonHref={sd.APP_URL + href}
          />

          <ArtworkGrid
            artworks={artworksConnection}
            columnCount={[2, 3, 4]}
            mediator={mediator}
          />
        </>
      )
    }
  ),
  graphql`
    fragment AuctionArtworkGrid_artwork on Artwork
      @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
      sale {
        href
        artworksConnection(first: 8, exclude: $excludeArtworkIDs) {
          ...ArtworkGrid_artworks
        }
      }
    }
  `
)

AuctionArtworkGridFragmentContainer.displayName = "AuctionArtworkGrid"
