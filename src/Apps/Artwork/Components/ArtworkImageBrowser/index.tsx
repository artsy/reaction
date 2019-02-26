import React, { useRef } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import { ArtworkImageBrowser_artwork } from "__generated__/ArtworkImageBrowser_artwork.graphql"
import { ArtworkImageBrowserQuery } from "__generated__/ArtworkImageBrowserQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ArtworkActionsFragmentContainer as ArtworkActions } from "./ArtworkActions"
import { ArtworkImageBrowser } from "./ArtworkImageBrowser"

export interface ImageBrowserProps {
  artwork: ArtworkImageBrowser_artwork
}

export class ArtworkImageBrowserContainer extends React.Component<
  ImageBrowserProps
> {
  childRef: any

  constructor(props) {
    super(props)
    this.childRef = useRef(null)
  }

  callChildMethod = () => {
    console.log("calling child method")
    this.childRef.testMethod()
  }

  render() {
    const { images } = this.props.artwork
    if (!images.length) {
      return null
    }

    return (
      <>
        <ArtworkImageBrowser images={images} ref={this.childRef} />
        <ArtworkActions
          artwork={this.props.artwork}
          testProp={this.callChildMethod}
        />
      </>
    )
  }
}

export const ArtworkImageBrowserFragmentContainer = createFragmentContainer<
  ImageBrowserProps
>(
  ArtworkImageBrowserContainer,
  graphql`
    fragment ArtworkImageBrowser_artwork on Artwork {
      title
      image_alt: to_s
      image_title
      href

      ...ArtworkActions_artwork

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

export const ArtworkImageBrowserQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  return (
    <ContextConsumer>
      {({ user, mediator, relayEnvironment }) => {
        return (
          <QueryRenderer<ArtworkImageBrowserQuery>
            environment={relayEnvironment}
            variables={{ artworkID }}
            query={graphql`
              query ArtworkImageBrowserQuery($artworkID: String!) {
                artwork(id: $artworkID) {
                  ...ArtworkImageBrowser_artwork
                }
              }
            `}
            render={renderWithLoadProgress(
              ArtworkImageBrowserFragmentContainer
            )}
          />
        )
      }}
    </ContextConsumer>
  )
}
