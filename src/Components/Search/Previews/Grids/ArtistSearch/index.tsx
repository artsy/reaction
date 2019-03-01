import { ArtistSearchPreview_viewer } from "__generated__/ArtistSearchPreview_viewer.graphql"
import { ArtistSearchPreviewQuery } from "__generated__/ArtistSearchPreviewQuery.graphql"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ContextConsumer } from "Artsy/SystemContext"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { MarketingCollectionsPreviewFragmentContainer as MarketingCollectionsPreview } from "./MarketingCollections"
import { RelatedArtworksPreviewFragmentContainer as RelatedArtworksPreview } from "./RelatedArtworks"

interface ArtistSearchPreviewProps {
  viewer: ArtistSearchPreview_viewer
}

export class ArtistSearchPreview extends React.Component<
  ArtistSearchPreviewProps
> {
  render() {
    const { viewer } = this.props
    const { marketingCollections } = viewer.artist

    if (marketingCollections.length > 0) {
      return (
        <MarketingCollectionsPreview
          marketingCollections={marketingCollections}
        />
      )
    }
    return <RelatedArtworksPreview viewer={viewer} />
  }
}

export const ArtistSearchPreviewFragmentContainer = createFragmentContainer(
  ArtistSearchPreview,
  graphql`
    fragment ArtistSearchPreview_viewer on Viewer
      @argumentDefinitions(entityID: { type: "String!" }) {
      artist(id: $entityID) {
        id
        marketingCollections(size: 6) {
          title
          ...MarketingCollectionsPreview_marketingCollections
        }
      }
      ...RelatedArtworksPreview_viewer @arguments(entityID: $entityID)
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
                viewer {
                  ...ArtistSearchPreview_viewer @arguments(entityID: $entityID)
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
