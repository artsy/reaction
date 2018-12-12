import { Box, Button, Flex, Serif, Tooltip } from "@artsy/palette"
import { Help } from "Assets/Icons/Help"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkSidebarBidAction_artwork } from "__generated__/ArtworkSidebarBidAction_artwork.graphql"

export interface ArtworkSidebarBidActionProps {
  artwork: ArtworkSidebarBidAction_artwork
}

export class ArtworkSidebarBidAction extends React.Component<
  ArtworkSidebarBidActionProps
> {
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
    const hasMyBids = !!(myLotStanding && myLotStanding.active_bid)

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
        active_bid {
          is_winning
        }
      }
      sale {
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
          display
        }
      }
    }
  `
)
