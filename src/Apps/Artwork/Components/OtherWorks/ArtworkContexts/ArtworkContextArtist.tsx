import { Join, Spacer } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import { ArtworkContextArtist_artwork } from "__generated__/ArtworkContextArtist_artwork.graphql"
import { ArtworkContextArtistQuery } from "__generated__/ArtworkContextArtistQuery.graphql"
import { OtherWorksContextProps } from "Apps/Artwork/Components/OtherWorks"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"

import {
  ArtistArtworkGrid,
  PartnerArtworkGrid,
  RelatedWorksArtworkGrid,
} from "Apps/Artwork/Components/OtherWorks/ArtworkGrids"

export const ArtworkContextArtistQueryRenderer: React.SFC<
  OtherWorksContextProps
> = ({ artworkSlug, artworkID }) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
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
            render={renderWithLoadProgress(
              ArtworkContextArtistFragmentContainer
            )}
          />
        )
      }}
    </ContextConsumer>
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
