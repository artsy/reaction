import { Box, Serif } from "@artsy/palette"
import { SystemContextConsumer } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkSidebarAuctionPartnerInfo_artwork } from "__generated__/ArtworkSidebarAuctionPartnerInfo_artwork.graphql"

export interface ArtworkSidebarAuctionPartnerInfoProps {
  artwork: ArtworkSidebarAuctionPartnerInfo_artwork
}

@track()
export class ArtworkSidebarAuctionPartnerInfo extends React.Component<
  ArtworkSidebarAuctionPartnerInfoProps
> {
  @track(() => ({
    context_module: Schema.ContextModule.Sidebar,
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.AuctionBuyerPremium,
    type: Schema.Type.Link,
  }))
  render() {
    const { partner, sale_artwork, sale } = this.props.artwork
    if (sale.is_closed) {
      return null
    }
    return (
      <SystemContextConsumer>
        {({ mediator }) => (
          <Box pb={3}>
            {partner && (
              <Serif size="2" weight="semibold" color="black100">
                {partner.name}
              </Serif>
            )}
            {sale_artwork && sale_artwork.estimate && (
              <Serif size="2" color="black60">
                Estimated value: {sale_artwork.estimate}
              </Serif>
            )}
          </Box>
        )}
      </SystemContextConsumer>
    )
  }
}

export const ArtworkSidebarAuctionPartnerInfoFragmentContainer = createFragmentContainer(
  ArtworkSidebarAuctionPartnerInfo,
  {
    artwork: graphql`
      fragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {
        partner {
          name
        }
        sale_artwork {
          estimate
        }
        sale {
          _id
          is_closed
        }
      }
    `,
  }
)
