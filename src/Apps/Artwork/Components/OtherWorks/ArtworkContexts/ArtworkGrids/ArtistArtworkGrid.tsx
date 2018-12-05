import { ArtistArtworkGrid_artwork } from "__generated__/ArtistArtworkGrid_artwork.graphql"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../../Header"

export const ArtistArtworkGridFragmentContainer = createFragmentContainer<{
  artwork: ArtistArtworkGrid_artwork
}>(
  ({
    artwork: {
      artist: { artworks_connection, href, name },
    },
  }) => {
    return (
      <>
        <Header
          title={`Other works by ${name}`}
          buttonHref={sd.APP_URL + href}
        />
        <ArtworkGrid artworks={artworks_connection} />
      </>
    )
  },
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
          first: 10
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
