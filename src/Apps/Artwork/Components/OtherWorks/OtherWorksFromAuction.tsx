import { Button, Flex, Serif } from "@artsy/palette"
import { OtherWorksFromAuction_artwork } from "__generated__/OtherWorksFromAuction_artwork.graphql"
import { OtherWorksFromAuctionQuery } from "__generated__/OtherWorksFromAuctionQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

interface OtherWorksFromAuctionProps {
  artwork: OtherWorksFromAuction_artwork
}

export const OtherWorksFromAuction: React.SFC<
  OtherWorksFromAuctionProps
> = props => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Serif size="8" color="black100" mb={2}>
        Other works from the auction
      </Serif>
      <Button variant="secondaryOutline" mb={3}>
        View all
      </Button>

      <ArtworkGrid artworks={props.artwork.artist.artworks} />
    </Flex>
  )
}

export const OtherWorksFromAuctionFragmentContainer = createFragmentContainer(
  OtherWorksFromAuction,
  graphql`
    fragment OtherWorksFromAuction_artwork on Artwork {
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

export const OtherWorksFromAuctionQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  return (
    <ContextConsumer>
      {({ user, mediator, relayEnvironment }) => {
        return (
          <QueryRenderer<OtherWorksFromAuctionQuery>
            environment={relayEnvironment}
            variables={{ artworkID }}
            query={graphql`
              query OtherWorksFromAuctionQuery($artworkID: String!) {
                artwork(id: $artworkID) {
                  ...OtherWorksFromAuction_artwork
                }
              }
            `}
            render={renderWithLoadProgress(
              OtherWorksFromAuctionFragmentContainer
            )}
          />
        )
      }}
    </ContextConsumer>
  )
}
