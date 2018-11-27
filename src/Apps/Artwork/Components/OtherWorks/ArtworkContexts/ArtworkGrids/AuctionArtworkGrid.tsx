import { AuctionArtworkGrid_artwork } from "__generated__/AuctionArtworkGrid_artwork.graphql"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../../Header"

interface AuctionArtworkGridProps {
  artwork: AuctionArtworkGrid_artwork
}

export const AuctionArtworkGrid: React.SFC<AuctionArtworkGridProps> = props => {
  return (
    <>
      <Header
        title="Other works from the auction"
        buttonHref={sd.APP_URL + props.artwork.sale.href}
      />

      <ArtworkGrid artworks={props.artwork.sale.artworksConnection} />
    </>
  )
}

export const AuctionArtworkGridFragmentContainer = createFragmentContainer(
  AuctionArtworkGrid,
  graphql`
    fragment AuctionArtworkGrid_artwork on Artwork
      @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
      sale {
        href
        artworksConnection(first: 10, exclude: $excludeArtworkIDs) {
          ...ArtworkGrid_artworks
        }
      }
    }
  `
)
