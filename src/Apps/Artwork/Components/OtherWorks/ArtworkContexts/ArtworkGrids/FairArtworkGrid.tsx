import { FairArtworkGrid_artwork } from "__generated__/FairArtworkGrid_artwork.graphql"
import { hideGrid } from "Apps/Artwork/Components/OtherWorks/ArtworkContexts/ArtworkGrids"
import { withContext } from "Artsy/SystemContext"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../../Header"

export const FairArtworkGridFragmentContainer = createFragmentContainer<{
  artwork: FairArtworkGrid_artwork
}>(
  withContext(
    ({
      artwork: {
        fair: { href, artworksConnection },
      },
      mediator,
    }) => {
      if (hideGrid(artworksConnection)) {
        return null
      }
      return (
        <>
          <Header
            title={"Other works from the booth"}
            buttonHref={sd.APP_URL + href}
          />
          <ArtworkGrid
            artworks={artworksConnection}
            columnCount={[2, 3, 4]}
            mediator={mediator}
          />
        </>
      )
    }
  ),
  graphql`
    fragment FairArtworkGrid_artwork on Artwork
      @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
      fair: show(at_a_fair: true) {
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
  `
)

FairArtworkGridFragmentContainer.displayName = "FairArtworkGrid"
