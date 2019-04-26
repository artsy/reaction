import { PartnerShowArtworkGrid_artwork } from "__generated__/PartnerShowArtworkGrid_artwork.graphql"
import { hideGrid } from "Apps/Artwork/Components/OtherWorks/ArtworkContexts/ArtworkGrids"
import { Mediator, withSystemContext } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../../Header"

interface PartnerShowArtworkGridProps {
  artwork: PartnerShowArtworkGrid_artwork
  mediator?: Mediator
}

@track({
  context_module: Schema.ContextModule.OtherWorksFromShow,
})
class PartnerShowArtworkGrid extends React.Component<
  PartnerShowArtworkGridProps
> {
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
        show: { artworksConnection, href, name },
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

export const PartnerShowArtworkGridFragmentContainer = createFragmentContainer(
  withSystemContext(PartnerShowArtworkGrid),
  {
    artwork: graphql`
      fragment PartnerShowArtworkGrid_artwork on Artwork
        @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
        show {
          href
          name

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
