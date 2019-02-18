import React from "react"

import { Box, Flex, Sans } from "@artsy/palette"
import { MerchandisableArtworks_viewer } from "__generated__/MerchandisableArtworks_viewer.graphql"
import { MerchandisableArtworksPreviewQuery } from "__generated__/MerchandisableArtworksPreviewQuery.graphql"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ContextConsumer, ContextProps } from "Artsy/SystemContext"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { get } from "Utils/get"
import { PreviewGridItemFragmentContainer as PreviewGridItem } from "./PreviewGridItem"

interface MerchandisableArtworksPreviewProps {
  viewer: MerchandisableArtworks_viewer
}

const MerchandisableArtworksPreview: React.SFC<
  MerchandisableArtworksPreviewProps
> = ({ viewer }) => {
  const artworks = get(
    viewer,
    x => x.filter_artworks.artworks_connection.edges,
    []
  ).map(x => x.node)

  const merchandisableItems = artworks.map((artwork, i) => (
    <Box width="50%">
      <PreviewGridItem artwork={artwork} key={i} />
    </Box>
  ))

  return (
    <Box>
      <Sans size="3" weight="medium" color="black100" mb={2}>
        Now Available for Buy Now/ Make Offer
      </Sans>

      <Flex alignItems="flex-start" flexWrap="wrap">
        {merchandisableItems}
      </Flex>
    </Box>
  )
}

export const MerchandisableArtworksPreviewFragmentContainer = createFragmentContainer(
  MerchandisableArtworksPreview,
  graphql`
    fragment MerchandisableArtworks_viewer on Viewer {
      filter_artworks(aggregations: [TOTAL], sort: "-decayed_merch") {
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

export const MerchandisableArtworksPreviewQueryRenderer: React.SFC<
  ContextProps
> = () => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<MerchandisableArtworksPreviewQuery>
            environment={relayEnvironment}
            variables={{}}
            query={graphql`
              query MerchandisableArtworksPreviewQuery {
                viewer {
                  ...MerchandisableArtworks_viewer
                }
              }
            `}
            render={renderWithLoadProgress(
              MerchandisableArtworksPreviewFragmentContainer
            )}
          />
        )
      }}
    </ContextConsumer>
  )
}
