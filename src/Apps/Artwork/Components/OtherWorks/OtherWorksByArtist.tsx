import { Button, Flex, Serif } from "@artsy/palette"
import { OtherWorksByArtist_artwork } from "__generated__/OtherWorksByArtist_artwork.graphql"
import { OtherWorksByArtistQuery } from "__generated__/OtherWorksByArtistQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

interface OtherWorksByArtistProps {
  artwork: OtherWorksByArtist_artwork
}

export const OtherWorksByArtist: React.SFC<OtherWorksByArtistProps> = props => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Serif size="8" color="black100" mb={2}>
        Other works by Artist
      </Serif>
      <Button variant="secondaryOutline" mb={3}>
        View all
      </Button>

      <ArtworkGrid artworks={props.artwork.artist.artworks} />
    </Flex>
  )
}

export const OtherWorksByArtistFragmentContainer = createFragmentContainer(
  OtherWorksByArtist,
  graphql`
    fragment OtherWorksByArtist_artwork on Artwork {
      id

      artist {
        name
        href
        counts {
          artworks(format: "0,0", label: "work")
        }

        # FIXME: add exclude: [$artistID]), but it throws relay compiler error

        artworks: artworks_connection(
          first: 10
          filter: [IS_FOR_SALE]
          sort: PUBLISHED_AT_DESC
        ) {
          ...ArtworkGrid_artworks
        }
      }
    }
  `
)

export const OtherWorksByArtistQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  return (
    <ContextConsumer>
      {({ user, mediator, relayEnvironment }) => {
        return (
          <QueryRenderer<OtherWorksByArtistQuery>
            environment={relayEnvironment}
            variables={{ artworkID }}
            query={graphql`
              query OtherWorksByArtistQuery($artworkID: String!) {
                artwork(id: $artworkID) {
                  ...OtherWorksByArtist_artwork
                }
              }
            `}
            render={renderWithLoadProgress(OtherWorksByArtistFragmentContainer)}
          />
        )
      }}
    </ContextConsumer>
  )
}
