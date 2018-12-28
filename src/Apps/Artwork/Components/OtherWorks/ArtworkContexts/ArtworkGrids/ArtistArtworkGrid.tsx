import { ArtistArtworkGrid_artwork } from "__generated__/ArtistArtworkGrid_artwork.graphql"
import { withContext } from "Artsy/SystemContext"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../../Header"

export const ArtistArtworkGridFragmentContainer = createFragmentContainer<{
  artwork: ArtistArtworkGrid_artwork
}>(
  withContext(({ artwork: { artist }, mediator }) => {
    if (!artist) return null
    return (
      <>
        <Header
          title={`Other works by ${artist.name}`}
          buttonHref={sd.APP_URL + artist.href}
        />
        <ArtworkGrid
          artworks={artist.artworks_connection}
          columnCount={[2, 3, 4]}
          mediator={mediator}
        />
      </>
    )
  }),
  graphql`
    fragment ArtistArtworkGrid_artwork on Artwork
      @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
      id
      artist {
        name
        href
        counts {
          artworks(format: "0,0", label: "work")
        }
        artworks_connection(
          first: 8
          filter: [IS_FOR_SALE]
          sort: PUBLISHED_AT_DESC
          exclude: $excludeArtworkIDs
        ) {
          ...ArtworkGrid_artworks
        }
      }
    }
  `
)

ArtistArtworkGridFragmentContainer.displayName = "ArtistArtworkGrid"
