import { Serif } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"

export interface AuctionBidInfoProps {
  artwork: {
    readonly sale?: {
      readonly is_open: boolean
      readonly is_closed: boolean
    }
  }
}

const AuctionBidInfoContainer = Box

export class AuctionBidInfo extends React.Component<AuctionBidInfoProps> {
  render() {
    const { artwork } = this.props
    if (artwork.sale && artwork.sale.is_closed) {
      return (
        <AuctionBidInfoContainer pb={2}>
          <Serif size="5t" weight="semibold" color="black100">
            Bidding closed
          </Serif>
        </AuctionBidInfoContainer>
      )
    }
    return (
      <AuctionBidInfoContainer pb={2}>
        <Serif size="2" weight="semibold" color="black100">
          All details for Bid Activity go here....
        </Serif>
      </AuctionBidInfoContainer>
    )
  }
}
