import { Box, Flex, Sans } from "@artsy/palette"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ContextConsumer } from "Artsy/SystemContext"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { get } from "Utils/get"

import { RelatedArtworksPreview_viewer } from "__generated__/RelatedArtworksPreview_viewer.graphql"
import { RelatedArtworksPreviewQuery } from "__generated__/RelatedArtworksPreviewQuery.graphql"
import { PreviewGridItemFragmentContainer as PreviewGridItem } from "../PreviewGridItem"

interface RelatedArtworksPreviewProps {
  viewer: RelatedArtworksPreview_viewer
}
const RelatedArtworksPreview: React.SFC<RelatedArtworksPreviewProps> = ({
  viewer,
}) => {
  const artworks = get(
    viewer,
    x => x.filter_artworks.artworks_connection.edges,
    []
  ).map(x => x.node)

  const relatedArtworks = artworks.map((artwork, i) => (
    <PreviewGridItem artwork={artwork} key={i} />
  ))
  return (
    <Box>
      <Sans size="2" weight="medium">
        Related Artworks
      </Sans>

      <Flex flexDirection="column">{relatedArtworks}</Flex>
    </Box>
  )
}

export const RelatedArtworksPreviewFragmentContainer = createFragmentContainer(
  RelatedArtworksPreview,
  graphql`
    fragment RelatedArtworksPreview_viewer on Viewer {
      filter_artworks(
        aggregations: [TOTAL]
        sort: "-decayed_merch"
        artist_id: $entityID
      ) {
        __id
        artworks_connection(first: 8) {
          edges {
            node {
              ...PreviewGridItem_artwork
            }
          }
        }
      }
    }
  `
)

export const RelatedArtworksPreviewQueryRenderer: React.SFC<{
  entityID: string
}> = ({ entityID }) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<RelatedArtworksPreviewQuery>
            environment={relayEnvironment}
            variables={{ entityID }}
            query={graphql`
              query RelatedArtworksPreviewQuery($entityID: String!) {
                viewer {
                  ...RelatedArtworksPreview_viewer
                }
              }
            `}
            render={renderWithLoadProgress(
              RelatedArtworksPreviewFragmentContainer
            )}
          />
        )
      }}
    </ContextConsumer>
  )
}
