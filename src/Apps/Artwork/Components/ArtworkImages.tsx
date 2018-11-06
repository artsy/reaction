import { ArtworkImages_artwork } from "__generated__/ArtworkImages_artwork.graphql"
import { ArtworkImagesQuery } from "__generated__/ArtworkImagesQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { ImageCarousel } from "./ImageCarousel"

interface ArtworkImagesProps {
  artwork: ArtworkImages_artwork
}

const ArtworkImages: React.SFC<ArtworkImagesProps> = props => {
  return <ImageCarousel images={props.artwork.images} />
}

export const ArtworkImagesFragmentContainer = createFragmentContainer(
  ArtworkImages,
  graphql`
    fragment ArtworkImages_artwork on Artwork {
      title
      image_alt: to_s
      image_title
      images {
        id
        # FIXME: Update uri name prop when new Responsive PR is merged
        uri: url(version: ["larger", "large"])
        placeholder: resized(width: 30, height: 30, version: "small") {
          url
        }
        is_zoomable

        # FIXME: Update aspectRatio name when new Responsive PR is merged
        aspectRatio: aspect_ratio
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
