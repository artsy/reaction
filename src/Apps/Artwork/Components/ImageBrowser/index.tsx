import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import { ImageBrowser_artwork } from "__generated__/ImageBrowser_artwork.graphql"
import { ImageBrowserQuery } from "__generated__/ImageBrowserQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ActionButtons } from "./ActionButtons"
import { ImageBrowser } from "./ImageBrowser"

export interface ImageBrowserProps {
  artwork: ImageBrowser_artwork
}

export const ImageBrowserFragmentContainer = createFragmentContainer<
  ImageBrowserProps
>(
  props => {
    return (
      <>
        <ImageBrowser images={props.artwork.images} />
        <ActionButtons artwork={props.artwork} />
      </>
    )
  },
  graphql`
    fragment ImageBrowser_artwork on Artwork {
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
          <QueryRenderer<ImageBrowserQuery>
            environment={relayEnvironment}
            variables={{ artworkID }}
            query={graphql`
              query ImageBrowserQuery($artworkID: String!) {
                artwork(id: $artworkID) {
                  ...ImageBrowser_artwork
                }
              }
            `}
            render={renderWithLoadProgress(ImageBrowserFragmentContainer)}
          />
        )
      }}
    </ContextConsumer>
  )
}
