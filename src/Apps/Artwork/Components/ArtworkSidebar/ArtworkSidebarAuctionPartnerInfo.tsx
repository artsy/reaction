import { Box, Link, Serif } from "@artsy/palette"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { ContextConsumer } from "Artsy/Router"
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
  onClickBuyerPremium(mediator) {
    mediator &&
      mediator.trigger &&
      mediator.trigger("openAuctionBuyerPremium", {
        auctionId: this.props.artwork.sale._id,
      })
  }

  render() {
    const { partner, sale_artwork, sale } = this.props.artwork
    if (sale.is_closed) {
      return null
    }
    return (
      <ContextConsumer>
        {({ mediator }) => (
          <Box pb={3}>
            {partner && (
              <Serif size="2" weight="semibold" color="black100">
                {partner.name}
              </Serif>
            )}
            {sale_artwork &&
              sale_artwork.estimate && (
                <Serif size="2" color="black60">
                  Estimated value: {sale_artwork.estimate}
                </Serif>
              )}
            {sale &&
              sale.is_with_buyers_premium && (
                <Serif size="2" color="black60">
                  This work has a{" "}
                  <Link onClick={this.onClickBuyerPremium.bind(this, mediator)}>
                    buyer's premium
                  </Link>.
                </Serif>
              )}
          </Box>
        )}
      </ContextConsumer>
    )
  }
}

export const ArtworkSidebarAuctionPartnerInfoFragmentContainer = createFragmentContainer(
  ArtworkSidebarAuctionPartnerInfo,
  graphql`
    fragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {
      _id
      partner {
        _id
        name
      }
      sale_artwork {
        estimate
      }
      sale {
        _id
        is_closed
        is_with_buyers_premium
      }
    }
  `
)
