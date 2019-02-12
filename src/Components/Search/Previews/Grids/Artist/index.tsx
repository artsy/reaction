import { ArtistSearchPreview_artist } from "__generated__/ArtistSearchPreview_artist.graphql"
import { ArtistSearchPreviewQuery } from "__generated__/ArtistSearchPreviewQuery.graphql"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ContextConsumer } from "Artsy/SystemContext"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { MarketingCollectionsGrid } from "./MarketingCollections"
import { RelatedArtworksQueryRenderer as RelatedArtworks } from "./RelatedArtworks"

interface ArtistSearchPreviewProps {
  artist: ArtistSearchPreview_artist
}

export const ArtistSearchPreview: React.SFC<ArtistSearchPreviewProps> = ({
  artist,
}) => {
  {
    const { marketingCollections } = artist

    if (marketingCollections.length > 0) {
      return (
        <MarketingCollectionsGrid marketingCollections={marketingCollections} />
      )
    }
    return <RelatedArtworks entityID={artist.id} />
  }
}

export const ArtistSearchPreviewFragmentContainer = createFragmentContainer(
  ArtistSearchPreview,
  graphql`
    fragment ArtistSearchPreview_artist on Artist {
      id
      marketingCollections {
        title
      }
    }
  `
)

export const ArtistSearchPreviewQueryRenderer: React.SFC<{
  entityID: string
}> = ({ entityID }) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<ArtistSearchPreviewQuery>
            environment={relayEnvironment}
            variables={{
              entityID,
            }}
            query={graphql`
              query ArtistSearchPreviewQuery($entityID: String!) {
                artist(id: $entityID) {
                  ...ArtistSearchPreview_artist
                }
              }
            `}
            render={renderWithLoadProgress(
              ArtistSearchPreviewFragmentContainer
            )}
          />
        )
      }}
    </ContextConsumer>
  )
}
