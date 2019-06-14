import { Join, Spacer } from "@artsy/palette"
import { ArtworkContextShow_artwork } from "__generated__/ArtworkContextShow_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import {
  ArtistArtworkGrid,
  PartnerArtworkGrid,
  PartnerShowArtworkGrid,
  RelatedWorksArtworkGrid,
} from "./ArtworkGrids"

export const ArtworkContextShowFragmentContainer = createFragmentContainer<{
  artwork: ArtworkContextShow_artwork
}>(
  props => {
    return (
      <Join separator={<Spacer my={2} />}>
        <PartnerShowArtworkGrid artwork={props.artwork} />
        <ArtistArtworkGrid artwork={props.artwork} />
        <PartnerArtworkGrid artwork={props.artwork} />
        <RelatedWorksArtworkGrid artwork={props.artwork} />
      </Join>
    )
  },
  {
    artwork: graphql`
      fragment ArtworkContextShow_artwork on Artwork
        @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
        id
        artist {
          name
          href
        }
        ...PartnerShowArtworkGrid_artwork
          @arguments(excludeArtworkIDs: $excludeArtworkIDs)
        ...ArtistArtworkGrid_artwork
          @arguments(excludeArtworkIDs: $excludeArtworkIDs)
        ...PartnerArtworkGrid_artwork
          @arguments(excludeArtworkIDs: $excludeArtworkIDs)
        ...RelatedWorksArtworkGrid_artwork
      }
    `,
  }
)
