// import { Serif } from "@artsy/palette"
// import { Sans } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"
import { Button } from "Styleguide/Elements/Button"
// import { Flex } from "Styleguide/Elements/Flex"

import { ArtworkSidebarBidAction_artwork } from "__generated__/ArtworkSidebarBidAction_artwork.graphql"

export interface ArtworkSidebarBidActionProps {
  artwork: ArtworkSidebarBidAction_artwork
  readonly me?: {
    readonly bidders: Array<{
      readonly qualified_for_bidding: boolean
    }>
    readonly bidder_status: {
      readonly active_bid?: {
        readonly __id: string
      }
    }
  }
}

export class ArtworkSidebarBidAction extends React.Component<
  ArtworkSidebarBidActionProps
> {
  render() {
    const { artwork, me } = this.props
    const registrationAttempted = me && me.bidders && me.bidders.length > 0
    const registeredToBid =
      registrationAttempted && me.bidders[0].qualified_for_bidding
    const hasPreviousBids =
      me &&
      me.bidder_status &&
      me.bidder_status.active_bid &&
      me.bidder_status.active_bid.__id

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
      return (
        <Box>
          {registrationAttempted &&
            !registeredToBid && (
              <Button width="100%" size="medium" mt={1} disabled>
                Registration pending
              </Button>
            )}
          {(!artwork.sale.is_registration_closed && !registrationAttempted) ||
          registeredToBid ? (
            <Button width="100%" size="medium" mt={1}>
              {hasPreviousBids ? "Increase max bid" : "Bid"}
            </Button>
          ) : (
            <Button width="100%" size="medium" mt={1} disabled>
              Registration closed
            </Button>
          )}
        </Box>
      )
    }

    return null
  }
}

export const ArtworkSidebarBidActionFragmentContainer = createFragmentContainer(
  ArtworkSidebarBidAction,
  graphql`
    fragment ArtworkSidebarBidAction_artwork on Artwork {
      sale {
        is_preview
        is_open
        is_live_open
        is_closed
        is_registration_closed
      }
    }
  `
)
