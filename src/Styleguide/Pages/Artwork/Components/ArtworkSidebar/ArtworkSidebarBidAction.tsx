// import { Serif } from "@artsy/palette"
// import { Sans } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"
import { Button } from "Styleguide/Elements/Button"
// import { Flex } from "Styleguide/Elements/Flex"

export interface ArtworkSidebarBidActionProps {
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

export class ArtworkSidebarBidAction extends React.Component<
  ArtworkSidebarBidActionProps
> {
  render() {
    const { artwork } = this.props
    if (artwork.sale.is_preview) {
      return (
        <Box>
          <Button width="100%" size="medium" mt={1}>
            Preview Action
          </Button>
        </Box>
      )
    }
    if (artwork.sale.is_live_open) {
      return (
        <Box>
          <Button width="100%" size="medium" mt={1}>
            Live Auction Action
          </Button>
        </Box>
      )
    }
    return (
      <Box>
        <Button width="100%" size="medium" mt={1}>
          Open Auction Actions
        </Button>
      </Box>
    )
  }
}
