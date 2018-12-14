import { Box, Button, Flex, LargeSelect, Serif, Tooltip } from "@artsy/palette"
import { Help } from "Assets/Icons/Help"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"

import { ArtworkSidebarBidAction_artwork } from "__generated__/ArtworkSidebarBidAction_artwork.graphql"

export interface ArtworkSidebarBidActionProps {
  artwork: ArtworkSidebarBidAction_artwork
}

export interface ArtworkSidebarBidActionState {
  selectedMaxBidCents?: number
}

export class ArtworkSidebarBidAction extends React.Component<
  ArtworkSidebarBidActionProps,
  ArtworkSidebarBidActionState
> {
  state: ArtworkSidebarBidActionState = {
    selectedMaxBidCents: null,
  }

  setMaxBid = (newVal: number) => {
    this.setState({ selectedMaxBidCents: newVal })
  }

  redirectToRegister = () => {
    const { sale } = this.props.artwork
    window.location.href = `${sd.APP_URL}/auction-registration/${sale.id}`
  }

  redirectToBid = (firstIncrement: number) => {
    const { id, sale } = this.props.artwork
    const bid = this.state.selectedMaxBidCents || firstIncrement
    window.location.href = `${sd.APP_URL}/auction/${
      sale.id
    }/bid/${id}?bid=${bid}`
  }

  render() {
    const { artwork } = this.props

    if (artwork.sale.is_closed) return null

    const registrationAttempted = !!artwork.sale.registrationStatus
    const registeredToBid =
      registrationAttempted &&
      artwork.sale.registrationStatus.qualified_for_bidding

    /**
     * NOTE: This is making an incorrect assumption that there could only ever
     *       be 1 live sale with this work. When we run into that case, there is
     *       likely design work to be done too, so we can adjust this then.
     */
    const myLotStanding = artwork.myLotStanding && artwork.myLotStanding[0]
    const hasMyBids = !!(myLotStanding && myLotStanding.most_recent_bid)

    if (artwork.sale.is_preview) {
      return (
        <Box>
          {!registrationAttempted && (
            <Button
              width="100%"
              size="medium"
              mt={1}
              onClick={() => this.redirectToRegister()}
            >
              Register to bid
            </Button>
          )}
          {registrationAttempted &&
            !registeredToBid && (
              <Button width="100%" size="medium" mt={1} disabled>
                Registration pending
              </Button>
            )}
          {registrationAttempted &&
            registeredToBid && (
              <Button width="100%" size="medium" mt={1} disabled>
                Registration complete
              </Button>
            )}
        </Box>
      )
    }

    if (artwork.sale.is_live_open) {
      return (
        <Box>
          {artwork.sale.is_registration_closed && !registeredToBid ? (
            <Button width="100%" size="medium" mt={1} disabled>
              Registration closed
            </Button>
          ) : (
            <Button width="100%" size="medium" mt={1}>
              Enter live bidding
            </Button>
          )}
        </Box>
      )
    }

    if (artwork.sale.is_open) {
      if (registrationAttempted && !registeredToBid) {
        return (
          <Box>
            <Button width="100%" size="medium" mt={1} disabled>
              Registration pending
            </Button>
          </Box>
        )
      }
      if (artwork.sale.is_registration_closed && !registeredToBid) {
        return (
          <Box>
            <Button width="100%" size="medium" mt={1} disabled>
              Registration closed
            </Button>
          </Box>
        )
      }

      const myLastMaxBid =
        hasMyBids && myLotStanding.most_recent_bid.max_bid.cents
      const increments = artwork.sale_artwork.increments.filter(
        increment => increment.cents > (myLastMaxBid || 0)
      )
      const firstIncrement = increments[0]
      const selectOptions = increments.map(increment => ({
        value: increment.cents.toString(),
        text: increment.display,
      }))

      return (
        <Box>
          <Flex width="100%" flexDirection="row">
            <Serif size="3t" color="black100" mr={1}>
              Place max bid
            </Serif>
            <Tooltip
              content="Set the maximum amount you would like Artsy to bid up to
            on your behalf"
            >
              <Help />
            </Tooltip>
          </Flex>
          <LargeSelect options={selectOptions} onSelect={this.setMaxBid} />
          <Button
            width="100%"
            size="medium"
            mt={1}
            onClick={() => this.redirectToBid(firstIncrement.cents)}
          >
            {hasMyBids ? "Increase max bid" : "Bid"}
          </Button>
        </Box>
      )
    }
  }
}

export const ArtworkSidebarBidActionFragmentContainer = createFragmentContainer(
  ArtworkSidebarBidAction,
  graphql`
    fragment ArtworkSidebarBidAction_artwork on Artwork {
      myLotStanding(live: true) {
        most_recent_bid {
          max_bid {
            cents
          }
        }
      }
      id
      sale {
        id
        registrationStatus {
          qualified_for_bidding
        }
        is_preview
        is_open
        is_live_open
        is_closed
        is_registration_closed
      }
      sale_artwork {
        increments {
          cents
          display
        }
      }
    }
  `
)
