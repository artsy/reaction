import { PartnerArtworkGrid_artwork } from "__generated__/PartnerArtworkGrid_artwork.graphql"
import { hideGrid } from "Apps/Artwork/Components/OtherWorks/ArtworkContexts/ArtworkGrids"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { Mediator, withContext } from "Artsy/SystemContext"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../../Header"

interface PartnerArtworkGridProps {
  artwork: PartnerArtworkGrid_artwork
  mediator?: Mediator
}

@track({
  context_module: Schema.ContextModule.OtherWorksFromGallery,
})
class PartnerArtworkGrid extends React.Component<PartnerArtworkGridProps> {
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
        partner: { artworksConnection, href, name },
      },
      mediator,
    } = this.props

    if (hideGrid(artworksConnection)) {
      return null
    }

    return (
      <>
        <Header
          title={`Other works from ${name}`}
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

export const PartnerArtworkGridFragmentContainer = createFragmentContainer(
  withContext(PartnerArtworkGrid),
  graphql`
    fragment PartnerArtworkGrid_artwork on Artwork
      @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
      partner {
        artworksConnection(
          first: 8
          exclude: $excludeArtworkIDs
          for_sale: true
          sort: PUBLISHED_AT_DESC
        ) {
          ...ArtworkGrid_artworks

          # Used to check for content
          edges {
            node {
              id
            }
          }
        }
        href
        name
      }
    }
  `
)
