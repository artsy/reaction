import { Flex, Spacer } from "@artsy/palette"
import { ImageBrowser_artwork } from "__generated__/ImageBrowser_artwork.graphql"
import { ImageBrowserQuery } from "__generated__/ImageBrowserQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import SaveButton from "Components/Artwork/Save"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { Media } from "Utils/Responsive"
import { ShareButton } from "./ActionButton"
import { LargeImageCarousel, SmallImageCarousel } from "./ImageCarousel2"

interface ImageBrowserProps {
  artwork: ImageBrowser_artwork
}

const ImageBrowser: React.SFC<ImageBrowserProps> = props => {
  return (
    <>
      <Media at="xs">
        <SmallImageCarousel images={props.artwork.images} />
      </Media>
      <Media greaterThan="xs">
        <LargeImageCarousel images={props.artwork.images} />
        <Spacer my={4} />
        <Flex justifyContent="center" position="relative" pl={2}>
          <SaveButton artwork={props.artwork} />
          <ShareButton href={props.artwork.href} />
        </Flex>
      </Media>
    </>
  )
}

export const ImageBrowserFragmentContainer = createFragmentContainer(
  ImageBrowser,
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
