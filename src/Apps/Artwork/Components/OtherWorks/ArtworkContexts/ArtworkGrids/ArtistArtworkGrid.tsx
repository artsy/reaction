import { ArtistArtworkGrid_artwork } from "__generated__/ArtistArtworkGrid_artwork.graphql"
import { hideGrid } from "Apps/Artwork/Components/OtherWorks/ArtworkContexts/ArtworkGrids"
import { Mediator, withSystemContext } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../../Header"

interface ArtistArtworkGridProps {
  artwork: ArtistArtworkGrid_artwork
  mediator?: Mediator
}

@track({
  context_module: Schema.ContextModule.OtherWorksByArtist,
})
export class ArtistArtworkGrid extends React.Component<ArtistArtworkGridProps> {
  @track({
    type: Schema.Type.ArtworkBrick,
    action_type: Schema.ActionType.Click,
  })
  trackBrickClick() {
    // noop
  }

  render() {
    const {
      artwork: { artist },
      mediator,
    } = this.props

    if (!artist || hideGrid(artist.artworks_connection)) {
      return null
    }

    return (
      <>
        <Header
          title={`Other works by ${artist.name}`}
          buttonHref={sd.APP_URL + artist.href}
        />
        <ArtworkGrid
          artworks={artist.artworks_connection}
          columnCount={[2, 3, 4]}
          preloadImageCount={0}
          mediator={mediator}
          onBrickClick={this.trackBrickClick.bind(this)}
        />
      </>
    )
  }
}

export const ArtistArtworkGridFragmentContainer = createFragmentContainer(
  withSystemContext(ArtistArtworkGrid),
  {
    artwork: graphql`
      fragment ArtistArtworkGrid_artwork on Artwork
        @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
        id
        artist {
          name
          href
          counts {
            artworks(format: "0,0", label: "work")
          }
          artworks_connection(
            first: 8
            filter: [IS_FOR_SALE]
            sort: PUBLISHED_AT_DESC
            exclude: $excludeArtworkIDs
          ) {
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
