import { Box, Join, Spacer } from "@artsy/palette"
import { OtherWorks_artwork } from "__generated__/OtherWorks_artwork.graphql"
import { OtherAuctionsQueryRenderer as OtherAuctions } from "Apps/Artwork/Components/OtherAuctions"
import { Header } from "Apps/Artwork/Components/OtherWorks/Header"
import { RelatedWorksArtworkGridRefetchContainer as RelatedWorksArtworkGrid } from "Apps/Artwork/Components/OtherWorks/RelatedWorksArtworkGrid"
import { Mediator, SystemContextProps, withSystemContext } from "Artsy"
import { track, useTracking } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"

export interface OtherWorksContextProps {
  artwork: OtherWorks_artwork
  mediator?: Mediator
}

/**
 * Check to see if a connection's edges have a length; if false hide the grid.
 */
export function hideGrid(artworksConnection): boolean {
  return Boolean(get(artworksConnection, p => !p.edges.length))
}

const populatedGrids = (grids: OtherWorks_artwork["contextGrids"]) => {
  if (grids && grids.length > 0) {
    return grids.filter(grid => {
      return (
        grid.artworks &&
        grid.artworks.edges &&
        grid.artworks.edges.length > 0 &&
        grid.__typename !== "RelatedArtworkGrid"
      )
    })
  }
}

const contextGridTypeToContextModule = contextGridType => {
  switch (contextGridType) {
    case "ArtistArtworkGrid": {
      return Schema.ContextModule.OtherWorksByArtist
    }
    case "PartnerArtworkGrid": {
      return Schema.ContextModule.OtherWorksFromGallery
    }
    case "AuctionArtworkGrid": {
      return Schema.ContextModule.OtherWorksInAuction
    }
    case "ShowArtworkGrid": {
      return Schema.ContextModule.OtherWorksFromShow
    }
  }
}

export const OtherWorks = track()(
  (props: { artwork: OtherWorks_artwork } & SystemContextProps) => {
    const { context, contextGrids, sale } = props.artwork
    const gridsToShow = populatedGrids(contextGrids)
    const tracking = useTracking()

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
                  mediator={props.mediator}
                  onBrickClick={() =>
                    tracking.trackEvent({
                      type: Schema.Type.ArtworkBrick,
                      action_type: Schema.ActionType.Click,
                      context_module: contextGridTypeToContextModule(
                        grid.__typename
                      ),
                    })
                  }
                />
              </React.Fragment>
            ))}
          </Join>
        )}
        {!(
          context &&
          context.__typename === "ArtworkContextAuction" &&
          !(sale && sale.is_closed)
        ) && (
          <Box mt={3}>
            <RelatedWorksArtworkGrid artwork={props.artwork} />
          </Box>
        )}
        {context && context.__typename === "ArtworkContextAuction" && (
          <OtherAuctions />
        )}
      </>
    )
  }
)

export const OtherWorksFragmentContainer = createFragmentContainer<{
  artwork: OtherWorks_artwork
}>(withSystemContext(OtherWorks), {
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
})
