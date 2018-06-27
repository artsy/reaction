// import { Serif } from "@artsy/palette"
// import { Sans } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"
import { Button } from "Styleguide/Elements/Button"
// import { Flex } from "Styleguide/Elements/Flex"

export interface BidActionProps {
  readonly artwork: {
    readonly sale?: {
      readonly is_preview: boolean
      readonly is_open: boolean
      readonly is_closed: boolean
      readonly is_live_open: boolean
      readonly is_registration_closed: boolean
    }
  }
  readonly me?: {
    readonly bidders: Array<{
      readonly id: string
      readonly qualified_for_bidding: boolean
    }>
    readonly bidder_status: {
      readonly active_bid?: {
        readonly max_bid?: {
          readonly display: string
        }
        readonly is_winning: boolean
      }
    }
  }
}
const BidActionContainer = Box

export class BidAction extends React.Component<BidActionProps> {
  render() {
    const { artwork } = this.props
    if (artwork.sale.is_preview) {
      return (
        <BidActionContainer>
          <Button width="100%" size="medium" mt={1}>
            Preview Action
          </Button>
        </BidActionContainer>
      )
    }
    if (artwork.sale.is_live_open) {
      return (
        <BidActionContainer>
          <Button width="100%" size="medium" mt={1}>
            Live Auction Action
          </Button>
        </BidActionContainer>
      )
    }
    return (
      <BidActionContainer>
        <Button width="100%" size="medium" mt={1}>
          Open Auction Actions
        </Button>
      </BidActionContainer>
    )
  }
}
