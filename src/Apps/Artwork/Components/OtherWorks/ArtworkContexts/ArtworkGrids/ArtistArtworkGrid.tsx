import { ArtistArtworkGrid_artwork } from "__generated__/ArtistArtworkGrid_artwork.graphql"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../../Header"

interface ArtistArtworkGridProps {
  artwork: ArtistArtworkGrid_artwork
}

export const ArtistArtworkGrid: React.SFC<ArtistArtworkGridProps> = props => {
  return (
    <>
      <Header
        title={`Other works by ${props.artwork.artist.name}`}
        buttonHref={sd.APP_URL + props.artwork.artist.href}
      />
      <ArtworkGrid artworks={props.artwork.artist.artworks_connection} />
    </>
  )
}

export const ArtistArtworkGridFragmentContainer = createFragmentContainer(
  ArtistArtworkGrid,
  graphql`
    fragment ArtistArtworkGrid_artwork on Artwork {
      id
      artist {
        name
        href
        counts {
          artworks(format: "0,0", label: "work")
        }
        # FIXME: add exclude: [$artistID]), but it throws relay compiler error
        artworks_connection(
          first: 10
          filter: [IS_FOR_SALE]
          sort: PUBLISHED_AT_DESC # exclude: [$artworkID]
        ) {
          ...ArtworkGrid_artworks
        }
      }
    }
  `
)
