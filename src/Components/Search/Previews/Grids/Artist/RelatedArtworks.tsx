import { Box, Flex, Sans } from "@artsy/palette"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ContextConsumer } from "Artsy/SystemContext"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { get } from "Utils/get"

import { RelatedArtworks_viewer } from "__generated__/RelatedArtworks_viewer.graphql"
import { RelatedArtworksQuery } from "__generated__/RelatedArtworksQuery.graphql"
import { PreviewGridItemFragmentContainer as PreviewGridItem } from "../PreviewGridItem"

interface RelatedArtworksProps {
  viewer: RelatedArtworks_viewer
}
const RelatedArtworks: React.SFC<RelatedArtworksProps> = ({ viewer }) => {
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

export const RelatedArtworksFragmentContainer = createFragmentContainer(
  RelatedArtworks,
  graphql`
    fragment RelatedArtworks_viewer on Viewer {
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

export const RelatedArtworksQueryRenderer: React.SFC<{
  entityID: string
}> = ({ entityID }) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<RelatedArtworksQuery>
            environment={relayEnvironment}
            variables={{ entityID }}
            query={graphql`
              query RelatedArtworksQuery($entityID: String!) {
                viewer {
                  ...RelatedArtworks_viewer
                }
              }
            `}
            render={renderWithLoadProgress(RelatedArtworksFragmentContainer)}
          />
        )
      }}
    </ContextConsumer>
  )
}
