import React from "react"

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

  return (
    <>
      <h1>Related Artworks</h1>

      {artworks.map(artwork => (
        <>
          <h3 key={artwork.title}>
            {artwork.title}, {artwork.date}
          </h3>
          <h4>{artwork.artist_names}</h4>
          <hr />
        </>
      ))}
    </>
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
                cropped(width: 50, height: 50) {
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
