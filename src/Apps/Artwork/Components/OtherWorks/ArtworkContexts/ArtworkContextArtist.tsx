import { Join, Spacer } from "@artsy/palette"
import { ArtworkContextArtist_artwork } from "__generated__/ArtworkContextArtist_artwork.graphql"
import { ArtworkContextArtistQuery } from "__generated__/ArtworkContextArtistQuery.graphql"
import { SystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React, { useContext } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { OtherWorksContextProps } from ".."

import {
  ArtistArtworkGrid,
  PartnerArtworkGrid,
  RelatedWorksArtworkGrid,
} from "./ArtworkGrids"

export const ArtworkContextArtistQueryRenderer: React.FC<
  OtherWorksContextProps
> = ({ artworkSlug, artworkID }) => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <QueryRenderer<ArtworkContextArtistQuery>
      environment={relayEnvironment}
      variables={{
        artworkSlug,
        excludeArtworkIDs: [artworkID],
      }}
      query={graphql`
        query ArtworkContextArtistQuery(
          $artworkSlug: String!
          $excludeArtworkIDs: [String!]
        ) {
          artwork(id: $artworkSlug) {
            ...ArtworkContextArtist_artwork
              @arguments(excludeArtworkIDs: $excludeArtworkIDs)
          }
        }
      `}
      render={renderWithLoadProgress(ArtworkContextArtistFragmentContainer)}
    />
  )
}

export const ArtworkContextArtistFragmentContainer = createFragmentContainer<{
  artwork: ArtworkContextArtist_artwork
}>(
  props => {
    return (
      <Join separator={<Spacer my={2} />}>
        <ArtistArtworkGrid artwork={props.artwork} />
        <PartnerArtworkGrid artwork={props.artwork} />
        <RelatedWorksArtworkGrid artwork={props.artwork} />
      </Join>
    )
  },
  graphql`
    fragment ArtworkContextArtist_artwork on Artwork
      @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
      id
      artist {
        name
        href
      }
      ...ArtistArtworkGrid_artwork
        @arguments(excludeArtworkIDs: $excludeArtworkIDs)
      ...PartnerArtworkGrid_artwork
        @arguments(excludeArtworkIDs: $excludeArtworkIDs)
      ...RelatedWorksArtworkGrid_artwork
    }
  `
)
