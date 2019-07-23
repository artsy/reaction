import { Join, Spacer } from "@artsy/palette"
import { OtherWorks_artwork } from "__generated__/OtherWorks_artwork.graphql"
import { OtherAuctionsQueryRenderer as OtherAuctions } from "Apps/Artwork/Components/OtherAuctions"
import { Header } from "Apps/Artwork/Components/OtherWorks/Header"
import { RelatedWorksArtworkGridRefetchContainer as RelatedWorksArtworkGrid } from "Apps/Artwork/Components/OtherWorks/RelatedWorksArtworkGrid"
import ArtworkGrid from "Components/ArtworkGrid"
import { filter } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"

export interface OtherWorksContextProps {
  /** The artworkSlug to query */
  artworkSlug: string
  /** Used to exclude the current work from the currently-shown work from grid */
  artworkID: string
}

/**
 * Check to see if a connection's edges have a length; if false hide the grid.
 */
export function hideGrid(artworksConnection): boolean {
  return Boolean(get(artworksConnection, p => !p.edges.length))
}

const populatedGrids = (grids: OtherWorks_artwork["contextGrids"]) => {
  if (grids && grids.length > 0) {
    return filter(grids, grid => {
      return (
        grid.artworks &&
        grid.artworks.edges &&
        grid.artworks.edges.length > 0 &&
        grid.__typename !== "RelatedArtworkGrid"
      )
    })
  }
}

export const OtherWorksFragmentContainer = createFragmentContainer<{
  artwork: OtherWorks_artwork
}>(
  props => {
    const { context, contextGrids, sale } = props.artwork

    const grids = contextGrids
    const gridsToShow = populatedGrids(grids)

    return (
      <>
        {gridsToShow && gridsToShow.length > 0 && (
          <Join separator={<Spacer my={3} />}>
            {gridsToShow.map((grid, index) => (
              <React.Fragment key={`Grid-${index}`}>
                <Header title={grid.title} buttonHref={grid.ctaHref} />
                <ArtworkGrid
                  artworks={grid.artworks}
                  columnCount={[2, 3, 4]}
                  preloadImageCount={0}
                />
              </React.Fragment>
            ))}
          </Join>
        )}
        {!(
          context &&
          context.__typename === "ArtworkContextAuction" &&
          !(sale && sale.is_closed)
        ) && <RelatedWorksArtworkGrid artwork={props.artwork} />}
        {context && context.__typename === "ArtworkContextAuction" && (
          <OtherAuctions />
        )}
      </>
    )
  },
  {
    artwork: graphql`
      fragment OtherWorks_artwork on Artwork {
        contextGrids {
          __typename
          title
          ctaTitle
          ctaHref
          artworks(first: 8) {
            ...ArtworkGrid_artworks

            edges {
              node {
                id
              }
            }
          }
        }

        ...RelatedWorksArtworkGrid_artwork

        id
        _id
        sale {
          is_closed
        }
        context {
          __typename
        }
      }
    `,
  }
)
