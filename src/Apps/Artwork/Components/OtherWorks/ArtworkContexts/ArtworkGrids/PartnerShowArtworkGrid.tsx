import { PartnerShowArtworkGrid_artwork } from "__generated__/PartnerShowArtworkGrid_artwork.graphql"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../../Header"

interface PartnerShowArtworkGridProps {
  artwork: PartnerShowArtworkGrid_artwork
}

export const PartnerShowArtworkGrid: React.SFC<
  PartnerShowArtworkGridProps
> = props => {
  const {
    artwork: {
      show: { artworksConnection, href, name },
    },
  } = props

  return (
    <>
      <Header
        title={`Other works from ${name}`}
        buttonHref={sd.APP_URL + href}
      />
      <ArtworkGrid artworks={artworksConnection} />
    </>
  )
}

export const PartnerShowArtworkGridFragmentContainer = createFragmentContainer(
  PartnerShowArtworkGrid,
  graphql`
    fragment PartnerShowArtworkGrid_artwork on Artwork
      @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
      show {
        artworksConnection(first: 20, exclude: $excludeArtworkIDs) {
          ...ArtworkGrid_artworks
        }
        href
        name
      }
    }
  `
)
