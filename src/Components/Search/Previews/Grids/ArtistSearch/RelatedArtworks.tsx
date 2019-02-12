import { Box, Flex, Sans } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"

import { RelatedArtworksPreview_viewer } from "__generated__/RelatedArtworksPreview_viewer.graphql"
import { PreviewGridItemFragmentContainer as PreviewGridItem } from "../PreviewGridItem"

interface RelatedArtworksPreviewProps {
  viewer: RelatedArtworksPreview_viewer
}
export const RelatedArtworksPreview: React.SFC<RelatedArtworksPreviewProps> = ({
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
    fragment RelatedArtworksPreview_viewer on Viewer
      @argumentDefinitions(entityID: { type: "String!" }) {
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
