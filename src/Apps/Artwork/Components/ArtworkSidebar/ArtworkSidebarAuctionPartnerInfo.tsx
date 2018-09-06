import { Serif } from "@artsy/palette"
import { Box } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkSidebarAuctionPartnerInfo_artwork } from "__generated__/ArtworkSidebarAuctionPartnerInfo_artwork.graphql"

export interface ArtworkSidebarAuctionPartnerInfoProps {
  artwork: ArtworkSidebarAuctionPartnerInfo_artwork
}

export class ArtworkSidebarAuctionPartnerInfo extends React.Component<
  ArtworkSidebarAuctionPartnerInfoProps
> {
  render() {
    const { artwork } = this.props
    if (!artwork.is_biddable) {
      return null
    }
    return (
      <Box pb={3}>
        {artwork.partner && (
          <Serif size="2" weight="semibold" color="black100">
            {artwork.partner.name}
          </Serif>
        )}
        {artwork.sale_artwork &&
          artwork.sale_artwork.estimate && (
            <Serif size="2" color="black60">
              Estimated value: {artwork.sale_artwork.estimate}
            </Serif>
          )}
        {artwork.sale &&
          artwork.sale.is_with_buyers_premium && (
            <Serif size="2" color="black60">
              This work has a <a href="#">buyer's premium</a>.
            </Serif>
          )}
      </Box>
    )
  }
}

export const ArtworkSidebarAuctionPartnerInfoFragmentContainer = createFragmentContainer(
  ArtworkSidebarAuctionPartnerInfo,
  graphql`
    fragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {
      is_biddable
      partner {
        __id
        name
      }
      sale_artwork {
        estimate
      }
      sale {
        is_with_buyers_premium
      }
    }
  `
)
