import { Join, Spacer } from "@artsy/palette"
import { ArtworkContextArtist_artwork } from "__generated__/ArtworkContextArtist_artwork.graphql"
import { ArtworkContextArtistQuery } from "__generated__/ArtworkContextArtistQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import {
  ArtistArtworkGrid,
  PartnerShowArtworkGrid,
  RelatedWorksArtworkGrid,
} from "./ArtworkGrids"

export const ArtworkContextArtistQueryRenderer = ({
  artworkSlug,
}: {
  artworkSlug: string
}) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<ArtworkContextArtistQuery>
            environment={relayEnvironment}
            variables={{ artworkSlug }}
            query={graphql`
              query ArtworkContextArtistQuery($artworkSlug: String!) {
                artwork(id: $artworkSlug) {
                  ...ArtworkContextArtist_artwork
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

export const ArtworkContextArtist: React.SFC<{
  artwork: ArtworkContextArtist_artwork
}> = props => {
  return (
    <Join separator={<Spacer my={2} />}>
      <ArtistArtworkGrid artwork={props.artwork} />
      <PartnerShowArtworkGrid artwork={props.artwork} />
      <RelatedWorksArtworkGrid />
    </Join>
  )
}

export const ArtworkContextArtistFragmentContainer = createFragmentContainer(
  ArtworkContextArtist,
  graphql`
    fragment ArtworkContextArtist_artwork on Artwork {
      id
      artist {
        name
        href
      }
      ...ArtistArtworkGrid_artwork
      ...PartnerShowArtworkGrid_artwork
    }
  `
)
