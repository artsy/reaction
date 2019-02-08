import React from "react"

import { Box, Flex, Image, Sans, Serif } from "@artsy/palette"
import { MerchandisableArtworks_viewer } from "__generated__/MerchandisableArtworks_viewer.graphql"
import { MerchandisableArtworksPreviewQuery } from "__generated__/MerchandisableArtworksPreviewQuery.graphql"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ContextConsumer, ContextProps } from "Artsy/SystemContext"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { get } from "Utils/get"

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
    <MerchandisableArtworkItem artwork={artwork} key={i} />
  ))

  return (
    <Box>
      <Sans size="2" weight="medium">
        Related Artworks
      </Sans>

      <Flex flexDirection="column">{merchandisableItems}</Flex>
    </Box>
  )
}

const MerchandisableArtworkItem = ({ artwork }) => {
  const imageUrl = get(artwork, x => x.image.cropped.url, "")
  return (
    <Flex m={2}>
      <Image mr={2} src={imageUrl} />
      <Box>
        <Serif size="2" italic>
          {artwork.title}, {artwork.date}
        </Serif>
        <Serif size="2">{artwork.artist_names}</Serif>
      </Box>
    </Flex>
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
              title
              artist_names
              image {
                cropped(width: 40, height: 40) {
                  url
                }
              }
              date
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
