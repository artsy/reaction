import { Flex, Serif } from "@artsy/palette"
import { RelatedWorks_artwork } from "__generated__/RelatedWorks_artwork.graphql"
import { RelatedWorksQuery } from "__generated__/RelatedWorksQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { Tab, Tabs } from "Styleguide/Components"

interface RelatedWorksProps {
  artwork: RelatedWorks_artwork
}

export const RelatedWorks: React.SFC<RelatedWorksProps> = props => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Serif size="8" color="black100" mb={2}>
        Other works from the fair
      </Serif>

      <Tabs justifyContent="center">
        <Tab name="Gene">
          <ArtworkGrid artworks={props.artwork.artist.artworks} />
        </Tab>
        <Tab name="Another Gene">
          <ArtworkGrid artworks={props.artwork.artist.artworks} />
        </Tab>
        <Tab name="Third Gene">
          <ArtworkGrid artworks={props.artwork.artist.artworks} />
        </Tab>
        <Tab name="Most Similar">
          <ArtworkGrid artworks={props.artwork.artist.artworks} />
        </Tab>
      </Tabs>
    </Flex>
  )
}

export const RelatedWorksFragmentContainer = createFragmentContainer(
  RelatedWorks,
  graphql`
    fragment RelatedWorks_artwork on Artwork {
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

export const RelatedWorksQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  return (
    <ContextConsumer>
      {({ user, mediator, relayEnvironment }) => {
        return (
          <QueryRenderer<RelatedWorksQuery>
            environment={relayEnvironment}
            variables={{ artworkID }}
            query={graphql`
              query RelatedWorksQuery($artworkID: String!) {
                artwork(id: $artworkID) {
                  ...RelatedWorks_artwork
                }
              }
            `}
            render={renderWithLoadProgress(RelatedWorksFragmentContainer)}
          />
        )
      }}
    </ContextConsumer>
  )
}
