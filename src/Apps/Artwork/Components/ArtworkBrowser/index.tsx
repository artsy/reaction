import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import { ArtworkBrowser_artwork } from "__generated__/ArtworkBrowser_artwork.graphql"
import { ArtworkBrowserQuery } from "__generated__/ArtworkBrowserQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ActionButtons } from "./ActionButtons"
import { ArtworkBrowser } from "./ArtworkBrowser"

export interface ImageBrowserProps {
  artwork: ArtworkBrowser_artwork
}

export const ArtworkBrowserFragmentContainer = createFragmentContainer<
  ImageBrowserProps
>(
  props => {
    return (
      <>
        <ArtworkBrowser images={props.artwork.images} />
        <ActionButtons artwork={props.artwork} />
      </>
    )
  },
  graphql`
    fragment ArtworkBrowser_artwork on Artwork {
      title
      image_alt: to_s
      image_title
      href
      ...Save_artwork
      images {
        id
        uri: url(version: ["larger", "large"])
        placeholder: resized(width: 30, height: 30, version: "small") {
          url
        }
        aspectRatio: aspect_ratio
        is_zoomable
        deepZoom: deep_zoom {
          Image {
            xmlns
            Url
            Format
            TileSize
            Overlap
            Size {
              Width
              Height
            }
          }
        }
      }
    }
  `
)

export const ImageBrowserQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  return (
    <ContextConsumer>
      {({ user, mediator, relayEnvironment }) => {
        return (
          <QueryRenderer<ArtworkBrowserQuery>
            environment={relayEnvironment}
            variables={{ artworkID }}
            query={graphql`
              query ArtworkBrowserQuery($artworkID: String!) {
                artwork(id: $artworkID) {
                  ...ArtworkBrowser_artwork
                }
              }
            `}
            render={renderWithLoadProgress(ArtworkBrowserFragmentContainer)}
          />
        )
      }}
    </ContextConsumer>
  )
}
