import { PartnerShowArtworkGrid_artwork } from "__generated__/PartnerShowArtworkGrid_artwork.graphql"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../../Header"

export const PartnerShowArtworkGridFragmentContainer = createFragmentContainer<{
  artwork: PartnerShowArtworkGrid_artwork
}>(
  ({
    artwork: {
      show: { artworksConnection, href, name },
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
    fragment PartnerShowArtworkGrid_artwork on Artwork
      @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
      show {
        artworksConnection(first: 8, exclude: $excludeArtworkIDs) {
          ...ArtworkGrid_artworks
        }
        href
        name
      }
    }
  `
)

PartnerShowArtworkGridFragmentContainer.displayName = "PartnerShowArtworkGrid"
