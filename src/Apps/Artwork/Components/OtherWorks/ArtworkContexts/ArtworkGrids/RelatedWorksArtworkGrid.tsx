import { take } from "lodash"
import React from "react"

import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import { RelatedWorksArtworkGrid_artwork } from "__generated__/RelatedWorksArtworkGrid_artwork.graphql"
import { RelatedWorksArtworkGridQuery } from "__generated__/RelatedWorksArtworkGridQuery.graphql"
import { Header } from "Apps/Artwork/Components/OtherWorks/Header"
import ArtworkGrid from "Components/ArtworkGrid"
import { Tab, Tabs } from "Styleguide/Components"

const MAX_TAB_ITEMS = 3

export const RelatedWorksArtworkGridFragmentContainer = createFragmentContainer<{
  artwork: RelatedWorksArtworkGrid_artwork
}>(
  props => {
    const names = take(
      props.artwork.layers.filter(layer => layer.name !== "For Sale"),
      MAX_TAB_ITEMS
    )

    return (
      <>
        <Header title="Related works" />
        <Tabs justifyContent="center">
          {names.map(({ name, artworksConnection }) => {
            return (
              <Tab name={name}>
                <ArtworkGrid artworks={artworksConnection} />
              </Tab>
            )
          })}
        </Tabs>
      </>
    )
  },
  graphql`
    fragment RelatedWorksArtworkGrid_artwork on Artwork {
      layers {
        name
        artworksConnection(first: 20) {
          ...ArtworkGrid_artworks
        }
      }
    }
  `
)

export const ArtworkContextArtistQueryRenderer: React.SFC<{
  artworkSlug: string
}> = ({ artworkSlug }) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<RelatedWorksArtworkGridQuery>
            environment={relayEnvironment}
            variables={{
              artworkSlug,
            }}
            query={graphql`
              query RelatedWorksArtworkGridQuery($artworkSlug: String!) {
                artwork(id: $artworkSlug) {
                  ...RelatedWorksArtworkGrid_artwork
                }
              }
            `}
            render={renderWithLoadProgress(
              RelatedWorksArtworkGridFragmentContainer
            )}
          />
        )
      }}
    </ContextConsumer>
  )
}

RelatedWorksArtworkGridFragmentContainer.displayName = "RelatedWorksArtworkGrid"
