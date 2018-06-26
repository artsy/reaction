import { Serif } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"

export interface AuctionPartnerInfoProps {
  artwork: {
    readonly is_biddable: boolean
    readonly partner: {
      readonly __id: string
      readonly name: string
    }
    readonly sale_artwork?: {
      readonly estimate?: string
    }
    readonly sale?: {
      readonly is_with_buyers_premium?: boolean
    }
  }
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
