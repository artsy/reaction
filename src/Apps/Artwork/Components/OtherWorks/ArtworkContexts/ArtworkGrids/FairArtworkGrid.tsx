import { FairArtworkGrid_artwork } from "__generated__/FairArtworkGrid_artwork.graphql"
import { hideGrid } from "Apps/Artwork/Components/OtherWorks/ArtworkContexts/ArtworkGrids"
import { Mediator, withSystemContext } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../../Header"

interface FairArtworkGridProps {
  artwork: FairArtworkGrid_artwork
  mediator?: Mediator
}

@track({
  context_module: Schema.ContextModule.OtherWorksInFair,
})
class FairArtworkGrid extends React.Component<FairArtworkGridProps> {
  @track({
    type: Schema.Type.ArtworkBrick,
    action_type: Schema.ActionType.Click,
  })
  trackBrickClick() {
    // noop
  }

  render() {
    const {
      artwork: {
        fair: { href, artworks_connection },
      },
      mediator,
    } = this.props

    if (hideGrid(artworks_connection)) {
      return null
    }

    return (
      <>
        <Header
          title={"Other works from the booth"}
          buttonHref={sd.APP_URL + href}
        />
        <ArtworkGrid
          artworks={artworks_connection}
          columnCount={[2, 3, 4]}
          preloadImageCount={0}
          mediator={mediator}
          onBrickClick={this.trackBrickClick.bind(this)}
        />
      </>
    )
  }
}

export const FairArtworkGridFragmentContainer = createFragmentContainer(
  withSystemContext(FairArtworkGrid),
  {
    artwork: graphql`
      fragment FairArtworkGrid_artwork on Artwork
        @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
        fair: show(at_a_fair: true) {
          href

          artworks_connection(first: 8, exclude: $excludeArtworkIDs) {
            ...ArtworkGrid_artworks

            # Used to check for content
            edges {
              node {
                id
              }
            }
          }
        }
      }
    `,
  }
)
