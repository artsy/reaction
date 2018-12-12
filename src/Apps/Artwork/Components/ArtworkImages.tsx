import { Flex } from "@artsy/palette"
import { ArtworkImages_artwork } from "__generated__/ArtworkImages_artwork.graphql"
import { ArtworkImagesQuery } from "__generated__/ArtworkImagesQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import SaveButton from "Components/Artwork/Save"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { ShareButton } from "./ActionButton"
import { ImageCarousel } from "./ImageCarousel"

interface ArtworkImagesProps {
  artwork: ArtworkImages_artwork
}

const ArtworkImages: React.SFC<ArtworkImagesProps> = props => {
  return (
    <ImageCarousel
      images={props.artwork.images}
      actions={
        <>
          <Flex justifyContent="center" position="relative">
            <SaveButton artwork={props.artwork} />
          </Flex>
          <ShareButton href={props.artwork.href} />
        </>
      }
    />
  )
}

export const ArtworkImagesFragmentContainer = createFragmentContainer(
  ArtworkImages,
  graphql`
    fragment ArtworkImages_artwork on Artwork {
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

export const ArtworkImagesQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  return (
    <ContextConsumer>
      {({ user, mediator, relayEnvironment }) => {
        return (
          <QueryRenderer<ArtworkImagesQuery>
            environment={relayEnvironment}
            variables={{ artworkID }}
            query={graphql`
              query ArtworkImagesQuery($artworkID: String!) {
                artwork(id: $artworkID) {
                  ...ArtworkImages_artwork
                }
              }
            `}
            render={renderWithLoadProgress(ArtworkImagesFragmentContainer)}
          />
        )
      }}
    </ContextConsumer>
  )
}
