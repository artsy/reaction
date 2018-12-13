import { PartnerArtworkGrid_artwork } from "__generated__/PartnerArtworkGrid_artwork.graphql"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../../Header"

export const PartnerArtworkGridFragmentContainer = createFragmentContainer<{
  artwork: PartnerArtworkGrid_artwork
}>(
  ({
    artwork: {
      partner: { artworksConnection, href, name },
    },
  }) => {
    return (
      <>
        <Header
          title={`Other works from ${name}`}
          buttonHref={sd.APP_URL + href}
        />
        <ArtworkGrid artworks={artworksConnection} />
      </>
    )
  },
  graphql`
    fragment PartnerArtworkGrid_artwork on Artwork
      @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
      partner {
        artworksConnection(first: 8, exclude: $excludeArtworkIDs) {
          ...ArtworkGrid_artworks
        }
        href
        name
      }
    }
  `
)

PartnerArtworkGridFragmentContainer.displayName = "PartnerArtworkGrid"
