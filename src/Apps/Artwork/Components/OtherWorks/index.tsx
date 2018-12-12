import { OtherWorks_artwork } from "__generated__/OtherWorks_artwork.graphql"
import { OtherWorksQuery } from "__generated__/OtherWorksQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { ArtworkContextArtistFragmentContainer as ArtworkContextArtist } from "./ArtworkContexts/ArtworkContextArtist"
import { ArtworkContextAuctionFragmentContainer as ArtworkContextAuction } from "./ArtworkContexts/ArtworkContextAuction"
import { ArtworkContextFairFragmentContainer as ArtworkContextFair } from "./ArtworkContexts/ArtworkContextFair"
import { ArtworkContextPartnerShowFragmentContainer as ArtworkContextPartnerShow } from "./ArtworkContexts/ArtworkContextPartnerShow"

export interface OtherWorksContextProps {
  /** The artworkSlug to query */
  artworkSlug: string
  /** Used to exclude the current work from the currently-shown work from grid */
  artworkID: string
}

export const OtherWorksFragmentContainer = createFragmentContainer<{
  artwork: OtherWorks_artwork
}>(
  ({ artwork }) => {
    const contextType = artwork.context && artwork.context.__typename

    switch (contextType) {
      case "ArtworkContextAuction": {
        return <ArtworkContextAuction artwork={artwork} />
      }
      case "ArtworkContextFair": {
        return <ArtworkContextFair artwork={artwork} />
      }
      case "ArtworkContextPartnerShow": {
        return <ArtworkContextPartnerShow artwork={artwork} />
      }
      default: {
        return <ArtworkContextArtist artwork={artwork} />
      }
    }
  },
  graphql`
    fragment OtherWorks_artwork on Artwork {
      id
      _id
      sale {
        is_closed
      }
      context {
        __typename
      }
      ...ArtworkContextFair_artwork
      ...ArtworkContextAuction_artwork
      ...ArtworkContextPartnerShow_artwork
      ...ArtworkContextArtist_artwork
    }
  `
)

// FIXME: Move to storybooks file

export const OtherWorksQueryRenderer = ({
  artworkSlug,
}: {
  artworkSlug: string
}) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<OtherWorksQuery>
            environment={relayEnvironment}
            variables={{ artworkSlug }}
            query={graphql`
              query OtherWorksQuery($artworkSlug: String!) {
                artwork(id: $artworkSlug) {
                  ...OtherWorks_artwork
                }
              }
            `}
            render={renderWithLoadProgress(OtherWorksFragmentContainer)}
          />
        )
      }}
    </ContextConsumer>
  )
}
