import { Box, Flex, Image, Sans, Separator, Serif } from "@artsy/palette"
import { Bid_artwork } from "__generated__/Bid_artwork.graphql"
import { Bid_me } from "__generated__/Bid_me.graphql"
import { Bid_sale } from "__generated__/Bid_sale.graphql"
import { Bid_saleArtwork } from "__generated__/Bid_saleArtwork.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"
import React from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql, RelayProp } from "react-relay"
import { TrackingProp } from "react-tracking"
import createLogger from "Utils/logger"

const logger = createLogger("Apps/Auction/Routes/Bid")

interface BidProps {
  sale: Bid_sale
  me: Bid_me
  artwork: Bid_artwork
  saleArtwork: Bid_saleArtwork
  relay: RelayProp
  tracking: TrackingProp
}

export const BidRoute: React.FC<BidProps> = props => {
  const { me, sale, artwork, saleArtwork } = props
  logger.log({
    me,
    sale,
    artwork,
    saleArtwork,
  })

  // TODO: tracking
  // const commonProperties = {
  //   auction_slug: sale.id,
  //   auction_state: sale.status,
  //   sale_id: sale._id,
  //   artwork_id: artwork._id,
  //   user_id: me.id,
  // }

  // function trackBidFailed(errors: string[]) {
  //   tracking.trackEvent({
  //     action_type: Schema.ActionType.RegistrationSubmitFailed,
  //     error_messages: errors,
  //     ...commonProperties,
  //   })
  // }

  // function trackBidSuccess(bidderId: string) {
  //   tracking.trackEvent({
  //     action_type: Schema.ActionType.RegistrationSubmitted,
  //     bidder_id: bidderId,
  //     ...commonProperties,
  //   })
  // }

  return (
    <AppContainer>
      <Title>Auction Registration</Title>
      <Box maxWidth={550} px={[2, 0]} mx="auto" mt={[1, 0]} mb={[1, 100]}>
        <Serif size="10">Confirm your bid</Serif>
        <Separator mt={1} mb={2} />
        <Flex>
          <Flex maxWidth="150px">
            <Image width="100%" src={artwork.imageUrl} />
          </Flex>
          <Flex pl={3} flexDirection="column">
            <Sans weight="medium" size="5t">
              Lot {artwork.title}
            </Sans>
            <Sans size="5t">Foo</Sans>
            <br />
            <Sans size="5t">Foo</Sans>
          </Flex>
        </Flex>
      </Box>
    </AppContainer>
  )
}

const TrackingWrappedBidRoute: React.FC<BidProps> = props => {
  const Component = track({
    context_page: Schema.PageName.AuctionBidPage,
  })(BidRoute)

  return <Component {...props} />
}

export const BidRouteFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(TrackingWrappedBidRoute),
  {
    artwork: graphql`
      fragment Bid_artwork on Artwork {
        _id
        title
        imageUrl
      }
    `,

    sale: graphql`
      fragment Bid_sale on Sale {
        id
        _id
        status
      }
    `,

    saleArtwork: graphql`
      fragment Bid_saleArtwork on SaleArtwork {
        id
        lotLabel: lot_label
      }
    `,

    me: graphql`
      fragment Bid_me on Me {
        id
      }
    `,
  }
)
