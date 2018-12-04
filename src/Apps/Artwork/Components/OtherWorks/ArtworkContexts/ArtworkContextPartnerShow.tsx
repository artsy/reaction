import { Join, Spacer } from "@artsy/palette"
import { ArtworkContextPartnerShow_artwork } from "__generated__/ArtworkContextPartnerShow_artwork.graphql"
import { ArtworkContextPartnerShowQuery } from "__generated__/ArtworkContextPartnerShowQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import {
  ArtistArtworkGrid,
  PartnerShowArtworkGrid,
  RelatedWorksArtworkGrid,
} from "./ArtworkGrids"

export const ArtworkContextPartnerShowQueryRenderer = ({
  artworkSlug,
  artworkID,
}: {
  artworkSlug: string
  artworkID: string
}) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
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
      }}
    </ContextConsumer>
  )
}

export const ArtworkContextPartnerShow: React.SFC<{
  artwork: ArtworkContextPartnerShow_artwork
}> = props => {
  return (
    <Join separator={<Spacer my={2} />}>
      <PartnerShowArtworkGrid artwork={props.artwork} />
      <ArtistArtworkGrid artwork={props.artwork} />
      <RelatedWorksArtworkGrid />
    </Join>
  )
}

export const ArtworkContextPartnerShowFragmentContainer = createFragmentContainer(
  ArtworkContextPartnerShow,
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
      # TODO: Pass in arguments
    }
  `
)
