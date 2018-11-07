import { Button, Flex, Serif } from "@artsy/palette"
import { OtherWorksFromFair_artwork } from "__generated__/OtherWorksFromFair_artwork.graphql"
import { OtherWorksFromFairQuery } from "__generated__/OtherWorksFromFairQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

interface OtherWorksFromFairProps {
  artwork: OtherWorksFromFair_artwork
}

export const OtherWorksFromFair: React.SFC<OtherWorksFromFairProps> = props => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Serif size="8" color="black100" mb={2}>
        Other works from the fair
      </Serif>
      <Button variant="secondaryOutline" mb={3}>
        View all
      </Button>

      <ArtworkGrid artworks={props.artwork.artist.artworks} />
    </Flex>
  )
}

export const OtherWorksFromFairFragmentContainer = createFragmentContainer(
  OtherWorksFromFair,
  graphql`
    fragment OtherWorksFromFair_artwork on Artwork {
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

export const OtherWorksFromFairQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  return (
    <ContextConsumer>
      {({ user, mediator, relayEnvironment }) => {
        return (
          <QueryRenderer<OtherWorksFromFairQuery>
            environment={relayEnvironment}
            variables={{ artworkID }}
            query={graphql`
              query OtherWorksFromFairQuery($artworkID: String!) {
                artwork(id: $artworkID) {
                  ...OtherWorksFromFair_artwork
                }
              }
            `}
            render={renderWithLoadProgress(OtherWorksFromFairFragmentContainer)}
          />
        )
      }}
    </ContextConsumer>
  )
}
