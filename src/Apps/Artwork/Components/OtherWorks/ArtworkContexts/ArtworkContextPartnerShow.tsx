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
}: {
  artworkSlug: string
}) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<ArtworkContextPartnerShowQuery>
            environment={relayEnvironment}
            variables={{ artworkSlug }}
            query={graphql`
              query ArtworkContextPartnerShowQuery($artworkSlug: String!) {
                artwork(id: $artworkSlug) {
                  ...ArtworkContextPartnerShow_artwork
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
    fragment ArtworkContextPartnerShow_artwork on Artwork {
      id
      artist {
        name
        href
      }
      ...PartnerShowArtworkGrid_artwork
      ...ArtistArtworkGrid_artwork
    }
  `
)
