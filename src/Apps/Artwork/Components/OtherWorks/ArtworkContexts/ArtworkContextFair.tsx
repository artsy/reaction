import { Join, Spacer } from "@artsy/palette"
import { ArtworkContextFair_artwork } from "__generated__/ArtworkContextFair_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import {
  ArtistArtworkGrid,
  FairArtworkGrid,
  PartnerShowArtworkGrid,
  RelatedWorksArtworkGrid,
} from "./ArtworkGrids"

export const ArtworkContextFairFragmentContainer = createFragmentContainer<{
  artwork: ArtworkContextFair_artwork
}>(
  props => {
    return (
      <Join separator={<Spacer my={2} />}>
        <FairArtworkGrid artwork={props.artwork} />
        <PartnerShowArtworkGrid artwork={props.artwork} />
        <ArtistArtworkGrid artwork={props.artwork} />
        <RelatedWorksArtworkGrid artwork={props.artwork} />
      </Join>
    )
  },
  {
    artwork: graphql`
      fragment ArtworkContextFair_artwork on Artwork
        @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
        id
        artist {
          name
          href
        }
        ...FairArtworkGrid_artwork
          @arguments(excludeArtworkIDs: $excludeArtworkIDs)
        ...PartnerShowArtworkGrid_artwork
          @arguments(excludeArtworkIDs: $excludeArtworkIDs)
        ...ArtistArtworkGrid_artwork
          @arguments(excludeArtworkIDs: $excludeArtworkIDs)
        ...RelatedWorksArtworkGrid_artwork
      }
    `,
  }
)
