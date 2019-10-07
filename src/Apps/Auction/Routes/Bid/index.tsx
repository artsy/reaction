import {
  Box,
  Button,
  Flex,
  Image,
  LargeSelect,
  Sans,
  Separator,
  Serif,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"
import { ConditionsOfSaleCheckbox } from "Components/Auction/ConditionsOfSaleCheckbox"
import React from "react"
import { Title } from "react-head"
import { createFragmentContainer, RelayProp } from "react-relay"
import { TrackingProp } from "react-tracking"
import createLogger from "Utils/logger"

const logger = createLogger("Apps/Auction/Routes/Bid")

interface BidProps {
  artwork: any
  me: any
  relay: RelayProp
  tracking: TrackingProp
}

export const BidRoute: React.FC<BidProps> = track({
  context_page: Schema.PageName.AuctionBidPage,
})(props => {
  console.log("BidRoute:", props)
  const { me, artwork } = props
  const { saleArtwork } = artwork
  const { sale } = saleArtwork
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
  //
  // const bidCount = 12
  const {
    counts: { bidderPositions: bidCount },
  } = saleArtwork

  return (
    <AppContainer>
      <Title>Auction Registration</Title>
      <Box maxWidth={550} px={[2, 0]} mx="auto" mt={[1, 0]} mb={[1, 100]}>
        <Serif size="8">Confirm your bid</Serif>
        <Separator />
        <Flex py={4}>
          <Flex maxWidth="150px">
            <Image width="100%" src={artwork.imageUrl} />
          </Flex>
          <Flex pl={3} pt={1} flexDirection="column">
            <Sans size="3" weight="medium" color="black100">
              Lot {saleArtwork.lotLabel}
            </Sans>
            <Serif size="3" color="black100">
              <i>{artwork.title}</i>
              {artwork.date && `, ${artwork.date}`}
            </Serif>
            <Serif size="3" color="black100">
              {artwork.artistNames}
            </Serif>
            <br />
            <Serif size="3">
              Current Bid: {saleArtwork.minimumNextBid.display}
            </Serif>
            {bidCount > 0 && (
              <Serif size="3" color="black60">
                ({bidCount} bid{bidCount > 1 && "s"})
              </Serif>
            )}
          </Flex>
        </Flex>
        <Separator />
        <Flex flexDirection="column" py={4}>
          <Serif pb={0.5} size="4t" weight="semibold" color="black100">
            Set your max bid
          </Serif>
          <LargeSelect
            options={[
              { text: "1 hundred doll hairs", value: "100" },
              { text: "1 million doll hairs", value: "100000000" },
            ]}
          />
        </Flex>

        <Separator />
        <Flex
          py={3}
          flexDirection="column"
          justifyContent="center"
          width="100%"
        >
          <Box mx="auto" mb={3}>
            <ConditionsOfSaleCheckbox />
          </Box>
          <Button block>Confirm bid</Button>
        </Flex>
      </Box>
    </AppContainer>
  )
})

export const BidRouteFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(BidRoute),
  {}
)
//   {
//     artwork: graphql`
//       fragment Bid_artwork on Artwork {
//         _id
//         title
//         imageUrl
//       }
//     `,

//     sale: graphql`
//       fragment Bid_sale on Sale {
//         id
//         _id
//         status
//       }
//     `,

//     saleArtwork: graphql`
//       fragment Bid_saleArtwork on SaleArtwork {
//         id
//         lotLabel: lot_label
//       }
//     `,

//     me: graphql`
//       fragment Bid_me on Me {
//         id
//       }
//     `,
//   }
// )
