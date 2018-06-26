import { Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"

import { AuctionPartnerInfo_artwork } from "__generated__/AuctionPartnerInfo_artwork.graphql"

export interface AuctionPartnerInfoProps {
  artwork: AuctionPartnerInfo_artwork
}

const AuctionPartnerInfoContainer = Box

export class AuctionPartnerInfo extends React.Component<
  AuctionPartnerInfoProps
> {
  render() {
    const { artwork } = this.props
    if (!artwork.is_biddable) {
      return null
    }
    return (
      <AuctionPartnerInfoContainer pb={3}>
        <Serif size="2" weight="semibold" color="black100">
          {artwork.partner.name}
        </Serif>
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
      </AuctionPartnerInfoContainer>
    )
  }
}

export const AuctionPartnerInfoFragmentContainer = createFragmentContainer(
  AuctionPartnerInfo,
  graphql`
    fragment AuctionPartnerInfo_artwork on Artwork {
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
