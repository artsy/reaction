import {
  Box,
  Button,
  Flex,
  HelpIcon,
  LargeSelect,
  Sans,
  Separator,
  Serif,
  Spacer,
  Tooltip,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"

import { ArtworkSidebarBidAction_artwork } from "__generated__/ArtworkSidebarBidAction_artwork.graphql"
import * as Schema from "Artsy/Analytics/Schema"
import { ContextConsumer } from "Artsy/SystemContext"
import track from "react-tracking"

export interface ArtworkSidebarBidActionProps {
  artwork: ArtworkSidebarBidAction_artwork
}

export interface ArtworkSidebarBidActionState {
  selectedMaxBidCents?: number
}

@track()
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

  @track((props: ArtworkSidebarBidActionProps) => ({
    artwork_slug: props.artwork.id,
    product_id: props.artwork.id,
    auction_slug: props.artwork.sale.id,
    context_page: Schema.PageName.ArtworkPage,
    action_type: Schema.ActionType.ClickedBid,
  }))
  redirectToBid(firstIncrement: number) {
    const { id, sale } = this.props.artwork
    const bid = this.state.selectedMaxBidCents || firstIncrement
    window.location.href = `${sd.APP_URL}/auction/${
      sale.id
    }/bid/${id}?bid=${bid}`
  }

  @track({
    type: Schema.Type.Button,
    flow: Schema.Flow.Auctions,
    subject: Schema.Subject.EnterLiveAuction,
    context_module: Schema.ContextModule.Sidebar,
    action_type: Schema.ActionType.Click,
  })
  redirectToLiveBidding(user) {
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
        <>
          {!registrationAttempted && (
            <Button
              width="100%"
              size="large"
              mt={1}
              onClick={() => this.redirectToRegister()}
            >
              Register to bid
            </Button>
          )}
          {registrationAttempted && !registeredToBid && (
            <Button width="100%" size="large" mt={1} disabled>
              Registration pending
            </Button>
          )}
          {registrationAttempted && registeredToBid && (
            <Button width="100%" size="large" mt={1} disabled>
              Registration complete
            </Button>
          )}
        </>
      )
    }

    if (artwork.sale.is_live_open) {
      return (
        <ContextConsumer>
          {({ user }) => {
            return (
              <Box>
                {artwork.sale.is_registration_closed && !registeredToBid && (
                  <Sans size="2" color="black60" pb={1} textAlign="center">
                    Registration closed
                  </Sans>
                )}
                <Button
                  width="100%"
                  size="large"
                  onClick={() => this.redirectToLiveBidding(user)}
                >
                  {artwork.sale.is_registration_closed && !registeredToBid
                    ? "Watch live bidding"
                    : "Enter live bidding"}
                </Button>
              </Box>
            )
          }}
        </ContextConsumer>
      )
    }

    if (artwork.sale.is_open) {
      if (registrationAttempted && !registeredToBid) {
        return (
          <Button width="100%" size="large" disabled>
            Registration pending
          </Button>
        )
      }
      if (artwork.sale.is_registration_closed && !registeredToBid) {
        return (
          <Button width="100%" size="large" disabled>
            Registration closed
          </Button>
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
          <Separator mb={2} />
          <Flex width="100%" flexDirection="row">
            <Serif size="3t" color="black100" mr={1}>
              Place max bid
            </Serif>
            <Tooltip
              content="Set the maximum amount you would like Artsy to bid up to
            on your behalf"
            >
              <HelpIcon />
            </Tooltip>
          </Flex>
          <LargeSelect options={selectOptions} onSelect={this.setMaxBid} />
          <Spacer mb={2} />
          <Button
            width="100%"
            size="large"
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
  {
    artwork: graphql`
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
    `,
  }
)
