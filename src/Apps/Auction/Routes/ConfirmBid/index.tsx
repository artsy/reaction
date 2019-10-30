import { Box, Separator, Serif } from "@artsy/palette"
import {
  ConfirmBidCreateBidderPositionMutation,
  ConfirmBidCreateBidderPositionMutationResponse,
} from "__generated__/ConfirmBidCreateBidderPositionMutation.graphql"
import { routes_ConfirmBidQueryResponse } from "__generated__/routes_ConfirmBidQuery.graphql"
import { BidFormFragmentContainer as BidForm } from "Apps/Auction/Components/BidForm"
import { LotInfoFragmentContainer as LotInfo } from "Apps/Auction/Components/LotInfo"
import { AppContainer } from "Apps/Components/AppContainer"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"
import { useTracking } from "Artsy/Analytics/useTracking"
import { FormikActions } from "formik"
import qs from "qs"
import React from "react"
import { Title } from "react-head"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { data as sd } from "sharify"
import { get } from "Utils/get"
import createLogger from "Utils/logger"

const logger = createLogger("Apps/Auction/Routes/ConfirmBid")

interface ConfirmBidProps {
  artwork: routes_ConfirmBidQueryResponse["artwork"]
  me: routes_ConfirmBidQueryResponse["me"]
  relay: RelayProp
  location: Location
}

export const ConfirmBidRoute: React.FC<ConfirmBidProps> = props => {
  const { artwork } = props
  const { saleArtwork } = artwork
  const { sale } = saleArtwork

  const { trackEvent } = useTracking()

  function createBidderPosition(maxBidAmountCents: number) {
    return new Promise(async (resolve, reject) => {
      commitMutation<ConfirmBidCreateBidderPositionMutation>(
        props.relay.environment,
        {
          onCompleted: data => {
            resolve(data)
          },
          onError: error => {
            reject(error)
          },
          mutation: graphql`
            mutation ConfirmBidCreateBidderPositionMutation(
              $input: BidderPositionInput!
            ) {
              createBidderPosition(input: $input) {
                result {
                  position {
                    id
                  }
                  status
                  message_header
                  message_description_md
                }
              }
            }
          `,
          variables: {
            input: {
              sale_id: sale.id,
              artwork_id: artwork.id,
              max_bid_amount_cents: maxBidAmountCents,
            },
          },
        }
      )
    })
  }

  function handleMutationError(
    actions: FormikActions<object>,
    error: Error,
    bidderId: string
  ) {
    logger.error(error)

    let errorMessages: string[]
    if (Array.isArray(error)) {
      errorMessages = error.map(e => e.message)
    } else if (typeof error === "string") {
      errorMessages = [error]
    } else if (error.message) {
      errorMessages = [error.message]
    }

    trackConfirmBidFailed(bidderId, errorMessages)

    actions.setSubmitting(false)
    actions.setStatus("submissionFailed")
  }

  function trackConfirmBidFailed(bidderId: string, errors: string[]) {
    trackEvent({
      action_type: Schema.ActionType.ConfirmBidFailed,
      bidder_id: bidderId,
      error_messages: errors,
    })
  }

  function trackConfirmBidSuccess(
    positionId: string,
    bidderId: string,
    selectedBidAmountCents: number
  ) {
    trackEvent({
      action_type: Schema.ActionType.ConfirmBidSubmitted,
      bidder_position_id: positionId,
      bidder_id: bidderId,
      order_id: bidderId,
      products: [
        {
          product_id: artwork._id,
          quantity: 1,
          price: selectedBidAmountCents / 100,
        },
      ],
    })
  }

  function handleSubmit(
    values: { selectedBid: number },
    actions: FormikActions<object>
  ) {
    const bidderId = sale.registrationStatus.id

    createBidderPosition(Number(values.selectedBid))
      .then((data: ConfirmBidCreateBidderPositionMutationResponse) => {
        if (data.createBidderPosition.result.status !== "SUCCESS") {
          trackConfirmBidFailed(bidderId, [
            "ConfirmBidCreateBidderPositionMutation failed",
          ])
        } else {
          const positionId = data.createBidderPosition.result.position.id
          trackConfirmBidSuccess(positionId, bidderId, values.selectedBid)
          window.location.assign(
            `${sd.APP_URL}/auction/${sale.id}/artwork/${artwork.id}`
          )
        }
      })
      .catch(error => {
        handleMutationError(actions, error, bidderId)
      })
      .finally(() => {
        actions.setSubmitting(false)
      })
  }

  return (
    <AppContainer>
      <Title>Confirm Bid | Artsy</Title>
      <Box maxWidth={550} px={[2, 0]} mx="auto" mt={[1, 0]} mb={[1, 100]}>
        <Serif size="8">Confirm your bid</Serif>
        <Separator />
        <LotInfo artwork={artwork} saleArtwork={artwork.saleArtwork} />
        <Separator />
        <BidForm
          initialSelectedBid={getInitialSelectedBid(props.location)}
          showPricingTransparency={false}
          saleArtwork={saleArtwork}
          onSubmit={handleSubmit}
        />
      </Box>
    </AppContainer>
  )
}

const getInitialSelectedBid = (location: Location): string | undefined => {
  return get(
    qs,
    querystring => querystring.parse(location.search.slice(1)).bid,
    undefined
  )
}

const TrackingWrappedConfirmBidRoute: React.FC<ConfirmBidProps> = props => {
  const Component = track<ConfirmBidProps>(p => ({
    context_page: Schema.PageName.AuctionConfirmBidPage,
    auction_slug: p.artwork.saleArtwork.sale.id,
    artwork_slug: p.artwork.id,
    sale_id: p.artwork.saleArtwork.sale._id,
    user_id: p.me.id,
  }))(ConfirmBidRoute)

  return <Component {...props} />
}

export const ConfirmBidRouteFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(TrackingWrappedConfirmBidRoute),
  {}
)
