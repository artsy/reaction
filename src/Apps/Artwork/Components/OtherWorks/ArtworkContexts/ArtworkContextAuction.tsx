import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Header } from "../Header"
import {
  ArtistArtworkGrid,
  AuctionArtworkGrid,
  PartnerArtworkGrid,
  RelatedWorksArtworkGrid,
} from "./ArtworkGrids"

export const ArtworkContextAuction = props => {
  return (
    <>
      <Header
        title="Other works from the auction"
        buttonHref="http://fixme.net/auction/the-auction-id"
      />
      <PartnerArtworkGrid />
      <AuctionArtworkGrid />
      <ArtistArtworkGrid artwork={props.artwork} />
      <RelatedWorksArtworkGrid />
    </>
  )
}

// TODO: Queries for
// ArtworkContextAuction:
// - PartnerArtworks
// - AuctionArtworks @skip(if: $isClosed)
// - ArtistArtworks @include(if: $isClosed)
// - RelatedArtworks @include(if: $isClosed)

export const ArtworkContextAuctionFragmentContainer = createFragmentContainer(
  ArtworkContextAuction,
  graphql`
    fragment ArtworkContextAuction_artwork on Artwork {
      id
    }
  `
)
