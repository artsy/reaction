import { Serif } from "@artsy/palette"
import { Sans } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"

import { LoosingBid } from "Assets/Icons/LoosingBid"
import { WinningBid } from "Assets/Icons/WinningBid"

export interface CurrentBidinfoProps {
  readonly artwork: {
    readonly sale?: {
      readonly is_open: boolean
      readonly is_closed: boolean
      readonly is_live_open: boolean
    }
    readonly sale_artwork: {
      readonly lot_label: string
      readonly estimate: string
      readonly is_with_reserve: boolean
      readonly reserve_message: string
      readonly reserve_status: string
      readonly current_bid: {
        readonly display: string
      }
      readonly counts: {
        readonly bidder_positions: number
      }
    }
  }
  readonly me?: {
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

const CurrentBidInfoContainer = Box
const BidStatusIconContainer = Box

export class CurrentBidInfo extends React.Component<CurrentBidinfoProps> {
  renderBidStatusIcon() {
    return this.props.me.bidder_status.active_bid.is_winning ? (
      <WinningBid />
    ) : (
      <LoosingBid />
    )
  }

  render() {
    const { artwork, me } = this.props
    if (artwork.sale && artwork.sale.is_closed) {
      return (
        <CurrentBidInfoContainer pb={2}>
          <Serif size="5t" weight="semibold" color="black100">
            Bidding closed
          </Serif>
        </CurrentBidInfoContainer>
      )
    }
    const bidsPresent = artwork.sale_artwork.counts.bidder_positions > 0
    const bidPrompt = bidsPresent ? "Current bid" : "Starting Bid"
    const bidColor =
      artwork.sale_artwork.is_with_reserve &&
      bidsPresent &&
      artwork.sale_artwork.reserve_status === "reserve_not_met"
        ? "red100"
        : "black60"
    let bidTextParts = []
    if (bidsPresent) {
      bidTextParts.push(
        artwork.sale_artwork.counts.bidder_positions === 1
          ? "1 bid"
          : artwork.sale_artwork.counts.bidder_positions + " bids"
      )
    }
    artwork.sale_artwork.reserve_message &&
      bidTextParts.push(artwork.sale_artwork.reserve_message)
    const bidText = bidTextParts.join(", ")

    const myBidPresent = me && me.bidder_status && me.bidder_status.active_bid
    return (
      <CurrentBidInfoContainer pb={2}>
        <Flex width="100%" flexDirection="row" justifyContent="space-between">
          <Serif size="5t" weight="semibold" pr={1}>
            {bidPrompt}
          </Serif>
          <Flex
            flexDirection="row"
            justifyContent="right"
            alignContent="baseline"
          >
            {myBidPresent && (
              <BidStatusIconContainer pt={0.5}>
                {this.renderBidStatusIcon()}
              </BidStatusIconContainer>
            )}
            <Serif size="5t" weight="semibold" pl={0.5}>
              {artwork.sale_artwork.current_bid.display}
            </Serif>
          </Flex>
        </Flex>
        <Flex width="100%" flexDirection="row" justifyContent="space-between">
          <Sans size="2" color={bidColor} pr={1}>
            {bidText}
          </Sans>
          {myBidPresent &&
            me.bidder_status.active_bid.max_bid && (
              <Sans size="2" color="black60" pl={1}>
                Your max: {me.bidder_status.active_bid.max_bid.display}
              </Sans>
            )}
        </Flex>
      </CurrentBidInfoContainer>
    )
  }
}
