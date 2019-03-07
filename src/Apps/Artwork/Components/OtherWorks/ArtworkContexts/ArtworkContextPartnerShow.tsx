import { Join, Spacer } from "@artsy/palette"
import { ArtworkContextPartnerShow_artwork } from "__generated__/ArtworkContextPartnerShow_artwork.graphql"
import { ArtworkContextPartnerShowQuery } from "__generated__/ArtworkContextPartnerShowQuery.graphql"
import { SystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React, { useContext } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { OtherWorksContextProps } from ".."

import {
  ArtistArtworkGrid,
  PartnerArtworkGrid,
  PartnerShowArtworkGrid,
  RelatedWorksArtworkGrid,
} from "./ArtworkGrids"

export const ArtworkContextPartnerShowQueryRenderer: React.SFC<
  OtherWorksContextProps
> = ({ artworkSlug, artworkID }) => {
  const { relayEnvironment } = useContext(SystemContext)
  return (
    <QueryRenderer<ArtworkContextPartnerShowQuery>
      environment={relayEnvironment}
      variables={{
        artworkSlug,
        excludeArtworkIDs: [artworkID],
      }}
      query={graphql`
        query ArtworkContextPartnerShowQuery(
          $artworkSlug: String!
          $excludeArtworkIDs: [String!]
        ) {
          artwork(id: $artworkSlug) {
            ...ArtworkContextPartnerShow_artwork
              @arguments(excludeArtworkIDs: $excludeArtworkIDs)
          }
        }
      `}
      render={renderWithLoadProgress(
        ArtworkContextPartnerShowFragmentContainer
      )}
    />
  )
}

export const ArtworkContextPartnerShowFragmentContainer = createFragmentContainer<{
  artwork: ArtworkContextPartnerShow_artwork
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
  graphql`
    fragment ArtworkContextPartnerShow_artwork on Artwork
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
  `
)
