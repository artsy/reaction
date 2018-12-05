import { FairArtworkGrid_artwork } from "__generated__/FairArtworkGrid_artwork.graphql"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../../Header"

interface FairArtworkGridProps {
  artwork: FairArtworkGrid_artwork
}

export const FairArtworkGrid: React.SFC<FairArtworkGridProps> = props => {
  const {
    artwork: {
      fair: { href, artworksConnection },
    },
  } = props

  return (
    <>
      <Header
        title={"Other works from the booth"}
        buttonHref={sd.APP_URL + href}
      />
      <ArtworkGrid artworks={artworksConnection} />
    </>
  )
}

export const FairArtworkGridFragmentContainer = createFragmentContainer(
  FairArtworkGrid,
  graphql`
    fragment FairArtworkGrid_artwork on Artwork
      @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
      fair: show(at_a_fair: true) {
        artworksConnection(first: 20, exclude: $excludeArtworkIDs) {
          ...ArtworkGrid_artworks
        }
        href
      }
    }
  `
)
