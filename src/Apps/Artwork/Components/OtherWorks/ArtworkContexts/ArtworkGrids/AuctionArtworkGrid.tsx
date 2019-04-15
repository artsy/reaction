import { AuctionArtworkGrid_artwork } from "__generated__/AuctionArtworkGrid_artwork.graphql"
import { hideGrid } from "Apps/Artwork/Components/OtherWorks/ArtworkContexts/ArtworkGrids"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { Mediator, withContext } from "Artsy/SystemContext"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../../Header"

interface AuctionArtworkGridProps {
  artwork: AuctionArtworkGrid_artwork
  mediator?: Mediator
}

@track({
  context_module: Schema.ContextModule.OtherWorksInAuction,
})
class AuctionArtworkGrid extends React.Component<AuctionArtworkGridProps> {
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
        sale: { artworksConnection, href },
      },
      mediator,
    } = this.props

    if (hideGrid(artworksConnection)) {
      return null
    }

    return (
      <>
        <Header
          title="Other works from the auction"
          buttonHref={sd.APP_URL + href}
        />

        <ArtworkGrid
          artworks={artworksConnection}
          columnCount={[2, 3, 4]}
          preloadImageCount={0}
          mediator={mediator}
          onBrickClick={this.trackBrickClick.bind(this)}
        />
      </>
    )
  }
}

export const AuctionArtworkGridFragmentContainer = createFragmentContainer(
  withContext(AuctionArtworkGrid),
  {
    artwork: graphql`
      fragment AuctionArtworkGrid_artwork on Artwork
        @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
        sale {
          href
          artworksConnection(first: 8, exclude: $excludeArtworkIDs) {
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
