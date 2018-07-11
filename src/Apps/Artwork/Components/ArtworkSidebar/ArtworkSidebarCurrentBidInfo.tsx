import { Serif } from "@artsy/palette"
import { Sans } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"

import { ArtworkSidebarCurrentBidInfo_artwork } from "__generated__/ArtworkSidebarCurrentBidInfo_artwork.graphql"
import { LoosingBid } from "Assets/Icons/LoosingBid"
import { WinningBid } from "Assets/Icons/WinningBid"

export interface ArtworkSidebarCurrentBidInfoProps {
  artwork: ArtworkSidebarCurrentBidInfo_artwork
}

export class ArtworkSidebarCurrentBidInfo extends React.Component<
  ArtworkSidebarCurrentBidInfoProps
> {
  render() {
    const { artwork } = this.props

    if (artwork.sale && artwork.sale.is_closed) {
      return (
        <Box pb={2}>
          <Serif size="5t" weight="semibold" color="black100">
            Bidding closed
          </Serif>
        </Box>
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

    /**
     * NOTE: This is making an incorrect assumption that there could only ever
     *       be 1 live sale with this work. When we run into that case, there is
     *       likely design work to be done too, so we can adjust this then.
     */
    const bidderStatus = artwork.bidderStatus && artwork.bidderStatus[0]
    const activeBid = bidderStatus && bidderStatus.active_bid
    const myBidPresent = !!activeBid
    return (
      <Box pb={2}>
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
              <Box pt={0.5}>
                {activeBid.is_winning ? <WinningBid /> : <LoosingBid />}
              </Box>
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
            activeBid.max_bid && (
              <Sans size="2" color="black60" pl={1}>
                Your max: {activeBid.max_bid.display}
              </Sans>
            )}
        </Flex>
      </Box>
    )
  }
}

export const ArtworkSidebarCurrentBidInfoFragmentContainer = createFragmentContainer(
  ArtworkSidebarCurrentBidInfo,
  graphql`
    fragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {
      bidderStatus(live: true) {
        active_bid {
          is_winning
          max_bid {
            display
          }
        }
      }
      sale {
        is_open
        is_closed
      }
      sale_artwork {
        lot_label
        estimate
        is_with_reserve
        reserve_message
        reserve_status
        current_bid {
          display
        }
        counts {
          bidder_positions
        }
      }
    }
  `
)
