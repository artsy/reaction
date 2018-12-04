import { Join, Spacer } from "@artsy/palette"
import { ArtworkContextFair_artwork } from "__generated__/ArtworkContextFair_artwork.graphql"
import { ArtworkContextFairQuery } from "__generated__/ArtworkContextFairQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import {
  ArtistArtworkGrid,
  FairArtworkGrid,
  PartnerShowArtworkGrid,
  RelatedWorksArtworkGrid,
} from "./ArtworkGrids"

export const ArtworkContextFairQueryRenderer = ({
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
          <QueryRenderer<ArtworkContextFairQuery>
            environment={relayEnvironment}
            variables={{
              artworkSlug,
              excludeArtworkIDs: [artworkID],
            }}
            query={graphql`
              query ArtworkContextFairQuery(
                $artworkSlug: String!
                $excludeArtworkIDs: [String!]
              ) {
                artwork(id: $artworkSlug) {
                  ...ArtworkContextFair_artwork
                    @arguments(excludeArtworkIDs: $excludeArtworkIDs)
                }
              }
            `}
            render={renderWithLoadProgress(ArtworkContextFairFragmentContainer)}
          />
        )
      }}
    </ContextConsumer>
  )
}

export const ArtworkContextFair: React.SFC<{
  artwork: ArtworkContextFair_artwork
}> = props => {
  return (
    <Join separator={<Spacer my={2} />}>
      <FairArtworkGrid artwork={props.artwork} />
      <PartnerShowArtworkGrid artwork={props.artwork} />
      <ArtistArtworkGrid artwork={props.artwork} />
      <RelatedWorksArtworkGrid />
    </Join>
  )
}

export const ArtworkContextFairFragmentContainer = createFragmentContainer(
  ArtworkContextFair,
  graphql`
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
      # TODO: Pass in arguments
    }
  `
)
