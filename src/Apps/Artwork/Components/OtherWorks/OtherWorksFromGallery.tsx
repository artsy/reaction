import { Button, Flex, Serif } from "@artsy/palette"
import { OtherWorksFromGallery_artwork } from "__generated__/OtherWorksFromGallery_artwork.graphql"
import { OtherWorksFromGalleryQuery } from "__generated__/OtherWorksFromGalleryQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

interface OtherWorksFromGalleryProps {
  artwork: OtherWorksFromGallery_artwork
}

export const OtherWorksFromGallery: React.SFC<
  OtherWorksFromGalleryProps
> = props => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Serif size="8" color="black100" mb={2}>
        Other works from the gallery
      </Serif>
      <Button variant="secondaryOutline" mb={3}>
        View all
      </Button>

      <ArtworkGrid artworks={props.artwork.artist.artworks} />
    </Flex>
  )
}

export const OtherWorksFromGalleryFragmentContainer = createFragmentContainer(
  OtherWorksFromGallery,
  graphql`
    fragment OtherWorksFromGallery_artwork on Artwork {
      artist {
        name
        href
        counts {
          artworks(format: "0,0", label: "work")
        }

        # FIXME: add exclude: [$artistID]), but it throws relay compiler error

        artworks: artworks_connection(first: 20, sort: PUBLISHED_AT_DESC) {
          ...ArtworkGrid_artworks
        }
      }
    }
  `
)

export const OtherWorksFromGalleryQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  return (
    <ContextConsumer>
      {({ user, mediator, relayEnvironment }) => {
        return (
          <QueryRenderer<OtherWorksFromGalleryQuery>
            environment={relayEnvironment}
            variables={{ artworkID }}
            query={graphql`
              query OtherWorksFromGalleryQuery($artworkID: String!) {
                artwork(id: $artworkID) {
                  ...OtherWorksFromGallery_artwork
                }
              }
            `}
            render={renderWithLoadProgress(
              OtherWorksFromGalleryFragmentContainer
            )}
          />
        )
      }}
    </ContextConsumer>
  )
}
