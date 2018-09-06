import { Sans } from "@artsy/palette"
import { Box } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkSidebarExtraLinks_artwork } from "__generated__/ArtworkSidebarExtraLinks_artwork.graphql"

export interface ArtworkSidebarExtraLinksProps {
  artwork: ArtworkSidebarExtraLinks_artwork
}

export class ArtworkSidebarExtraLinks extends React.Component<
  ArtworkSidebarExtraLinksProps
> {
  render() {
    const { artwork } = this.props

    if (artwork.is_in_auction && artwork.sale && !artwork.sale.is_closed) {
      return (
        <Box pb={3} pt={1}>
          <Sans size="2" color="black60">
            Have a question? <a href="#">Read our FAQ</a> or{" "}
            <a href="#">ask a specialist</a>.
          </Sans>
        </Box>
      )
    }
    const isForSaleArtwork = artwork.is_for_sale
    const consignableArtists = artwork.artists.filter(
      artist => artist.is_consignable
    )
    if (!isForSaleArtwork && consignableArtists.length === 0) {
      return null
    }
    return (
      <Box pb={3} pt={1}>
        {isForSaleArtwork && (
          <Sans size="2" color="black60">
            Questions about buying art on Artsy? <a href="#">Read our FAQ</a>.
          </Sans>
        )}
        {consignableArtists.length > 0 && (
          <Sans size="2" color="black60">
            Want to sell a work by this artist? <a href="#">Lean more</a>.
          </Sans>
        )}
      </Box>
    )
  }
}

export const ArtworkSidebarExtraLinksFragmentContainer = createFragmentContainer(
  ArtworkSidebarExtraLinks,
  graphql`
    fragment ArtworkSidebarExtraLinks_artwork on Artwork {
      __id
      is_in_auction
      is_for_sale
      artists {
        __id
        is_consignable
      }
      sale {
        is_closed
      }
    }
  `
)
