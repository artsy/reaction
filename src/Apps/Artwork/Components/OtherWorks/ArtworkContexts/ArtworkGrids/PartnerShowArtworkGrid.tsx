import { PartnerShowArtworkGrid_artwork } from "__generated__/PartnerShowArtworkGrid_artwork.graphql"
import { withContext } from "Artsy/SystemContext"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../../Header"

export const PartnerShowArtworkGridFragmentContainer = createFragmentContainer<{
  artwork: PartnerShowArtworkGrid_artwork
}>(
  withContext(
    ({
      artwork: {
        show: { artworksConnection, href, name },
      },
      mediator,
    }) => {
      return (
        <>
          <Header
            title={`Other works from ${name}`}
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
