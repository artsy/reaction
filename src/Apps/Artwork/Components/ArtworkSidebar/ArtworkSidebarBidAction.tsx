import { Box, Button, Flex, LargeSelect, Serif, Tooltip } from "@artsy/palette"
import { Help } from "Assets/Icons/Help"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"

import { ArtworkSidebarBidAction_artwork } from "__generated__/ArtworkSidebarBidAction_artwork.graphql"
import { ContextConsumer } from "Artsy/SystemContext"

export interface ArtworkSidebarBidActionProps {
  artwork: ArtworkSidebarBidAction_artwork
}

export interface ArtworkSidebarBidActionState {
  nextMaxBidCents?: number
}

export class ArtworkSidebarBidAction extends React.Component<
  ArtworkSidebarBidActionProps,
  ArtworkSidebarBidActionState
> {
  state: ArtworkSidebarBidActionState = {
    nextMaxBidCents: null,
  }

  setMaxBid = (newVal: number) => {
    this.setState({ nextMaxBidCents: newVal })
  }

  redirectToLiveBidding = (user: User) => {
    const { id } = this.props.artwork.sale
    const liveUrl = `${sd.PREDICTION_URL}/${id}`
    if (user) {
      window.location.href = `${liveUrl}/login`
    } else {
      window.location.href = liveUrl
    }
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
            <Button width="100%" size="medium" mt={1}>
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
        <ContextConsumer>
          {({ user }) => {
            return (
              <Box>
                {artwork.sale.is_registration_closed && !registeredToBid ? (
                  <Button width="100%" size="medium" mt={1} disabled>
                    Registration closed
                  </Button>
                ) : (
                  <Button
                    width="100%"
                    size="medium"
                    mt={1}
                    onClick={() => this.redirectToLiveBidding(user)}
                  >
                    Enter live bidding
                  </Button>
                )}
              </Box>
            )
          }}
        </ContextConsumer>
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
          <Button width="100%" size="medium" mt={1}>
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
