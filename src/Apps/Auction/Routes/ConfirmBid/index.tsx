import { Box, Separator, Serif } from "@artsy/palette"
import { BidderPositionQueryResponse } from "__generated__/BidderPositionQuery.graphql"
import { ConfirmBid_me } from "__generated__/ConfirmBid_me.graphql"
import {
  ConfirmBidCreateBidderPositionMutation,
  ConfirmBidCreateBidderPositionMutationResponse,
} from "__generated__/ConfirmBidCreateBidderPositionMutation.graphql"
import { routes_ConfirmBidQueryResponse } from "__generated__/routes_ConfirmBidQuery.graphql"
import {
  BidFormFragmentContainer as BidForm,
  determineDisplayRequirements,
  FormValues,
} from "Apps/Auction/Components/BidForm"
import { LotInfoFragmentContainer as LotInfo } from "Apps/Auction/Components/LotInfo"
import { bidderPositionQuery } from "Apps/Auction/Routes/ConfirmBid/BidderPositionQuery"
import { createCreditCardAndUpdatePhone } from "Apps/Auction/Routes/Register"
import { AppContainer } from "Apps/Components/AppContainer"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"
import { useTracking } from "Artsy/Analytics/useTracking"
import { FormikActions } from "formik"
import qs from "qs"
import React, { useEffect, useState } from "react"
import { Title } from "react-head"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import {
  Elements,
  injectStripe,
  ReactStripeElements,
  StripeProvider,
} from "react-stripe-elements"
import { data as sd } from "sharify"
import { get } from "Utils/get"
import createLogger from "Utils/logger"

const logger = createLogger("Apps/Auction/Routes/ConfirmBid")

type BidFormActions = FormikActions<FormValues>

interface ConfirmBidProps extends ReactStripeElements.InjectedStripeProps {
  artwork: routes_ConfirmBidQueryResponse["artwork"]
  me: ConfirmBid_me
  relay: RelayProp
  location: Location
}

const MAX_POLL_ATTEMPTS = 20

export const ConfirmBidRoute: React.FC<ConfirmBidProps> = props => {
  let pollCount = 0

  const { artwork, me, relay, stripe } = props
  const { saleArtwork } = artwork
  const { sale } = saleArtwork
  const { environment } = relay
  const { trackEvent } = useTracking()
  const { requiresPaymentInformation } = determineDisplayRequirements(
    (sale as any).registrationStatus,
    me as any
  )

  function createBidderPosition(maxBidAmountCents: number) {
    return new Promise<ConfirmBidCreateBidderPositionMutationResponse>(
      (resolve, reject) => {
        commitMutation<ConfirmBidCreateBidderPositionMutation>(environment, {
          onCompleted: data => resolve(data),
          onError: error => reject(error),
          mutation: graphql`
            mutation ConfirmBidCreateBidderPositionMutation(
              $input: BidderPositionInput!
            ) {
              createBidderPosition(input: $input) {
                result {
                  position {
                    id
                    sale_artwork {
                      sale {
                        registrationStatus {
                          id
                        }
                      }
                    }
                  }
                  status
                  messageHeader: message_header
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
        })
      }
    )
  }

  function onJsError(actions: BidFormActions, error: Error, bidderId: string) {
    logger.error(error)
    trackConfirmBidFailed(bidderId, [`JavaScript error: ${error.message}`])
    actions.setSubmitting(false)
    actions.setStatus(
      "Something went wrong while processing your bid. Please make sure your internet connection is active and try again"
    )
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

  const createTokenFromAddress = async (address: stripe.TokenOptions) => {
    const { error, token } = await stripe.createToken(address)

    if (error) {
      throw new Error(`Stripe error: ${error.message || error.decline_code}`)
    } else {
      return token
    }
  }

  async function handleSubmit(values: FormValues, actions: BidFormActions) {
    const selectedBid = Number(values.selectedBid)
    const possibleExistingBidderId: string | null =
      sale.registrationStatus && sale.registrationStatus.id

    if (requiresPaymentInformation) {
      try {
        const { address } = values
        const stripeAddress = {
          name: address.name,
          address_line1: address.addressLine1,
          address_line2: address.addressLine2,
          address_country: address.country,
          address_city: address.city,
          address_state: address.region,
          address_zip: address.postalCode,
        }

        const token = await createTokenFromAddress(stripeAddress)
        await createCreditCardAndUpdatePhone(
          environment,
          address.phoneNumber,
          token.id
        )
      } catch (error) {
        onJsError(actions, error, possibleExistingBidderId)
        return
      }
    }

    createBidderPosition(selectedBid)
      .then(data =>
        verifyBidderPosition({
          actions,
          data,
          selectedBid,
          possibleExistingBidderId,
        })
      )
      .catch(error => onJsError(actions, error, possibleExistingBidderId))
  }

  function verifyBidderPosition({
    actions,
    data,
    possibleExistingBidderId,
    selectedBid,
  }: {
    actions: BidFormActions
    data: ConfirmBidCreateBidderPositionMutationResponse
    possibleExistingBidderId: string
    selectedBid: number
  }) {
    const { result } = data.createBidderPosition
    const { position, messageHeader } = result
    const bidderId =
      possibleExistingBidderId ||
      (position &&
        position.sale_artwork &&
        position.sale_artwork.sale &&
        position.sale_artwork.sale.registrationStatus.id)

    if (result.status === "SUCCESS") {
      bidderPositionQuery(environment, { bidderPositionID: position.id })
        .then(res =>
          checkBidderPosition({ actions, data: res, bidderId, selectedBid })
        )
        .catch(error => onJsError(actions, error, bidderId))
    } else {
      actions.setStatus(messageHeader)
      actions.setSubmitting(false)
      trackConfirmBidFailed(bidderId, [messageHeader])
    }
  }

  function checkBidderPosition({
    actions,
    data,
    bidderId,
    selectedBid,
  }: {
    actions: BidFormActions
    data: BidderPositionQueryResponse
    bidderId: string
    selectedBid: number
  }) {
    const { bidderPosition } = data.me
    const { status, position, messageHeader } = bidderPosition

    if (status === "PENDING" && pollCount < MAX_POLL_ATTEMPTS) {
      // initiating new request here (vs setInterval) to make sure we wait for
      // the previous call to return before making a new one
      setTimeout(
        () =>
          bidderPositionQuery(environment, { bidderPositionID: position.id })
            .then(res =>
              checkBidderPosition({ actions, data: res, bidderId, selectedBid })
            )
            .catch(error => onJsError(actions, error, bidderId)),
        1000
      )

      pollCount += 1
    } else if (status === "WINNING") {
      trackConfirmBidSuccess(position.id, bidderId, selectedBid)
      window.location.assign(`${sd.APP_URL}/artwork/${artwork.id}`)
    } else {
      actions.setStatus(messageHeader)
      actions.setSubmitting(false)
      trackConfirmBidFailed(bidderId, [messageHeader])
    }
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
          me={me as any}
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

const StripeInjectedConfirmBidRoute = injectStripe(ConfirmBidRoute)

export const StripeWrappedConfirmBidRoute: React.FC<
  ConfirmBidProps
> = props => {
  const [stripe, setStripe] = useState(null)

  function setupStripe() {
    setStripe(window.Stripe(sd.STRIPE_PUBLISHABLE_KEY))
  }

  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(sd.STRIPE_PUBLISHABLE_KEY))
    } else {
      document.querySelector("#stripe-js").addEventListener("load", setupStripe)

      return () => {
        document
          .querySelector("#stripe-js")
          .removeEventListener("load", setupStripe)
      }
    }
  }, [])

  return (
    <StripeProvider stripe={stripe}>
      <Elements>
        <StripeInjectedConfirmBidRoute {...props} />
      </Elements>
    </StripeProvider>
  )
}

const TrackingWrappedConfirmBidRoute: React.FC<ConfirmBidProps> = props => {
  const Component = track<ConfirmBidProps>(p => ({
    context_page: Schema.PageName.AuctionConfirmBidPage,
    auction_slug: p.artwork.saleArtwork.sale.id,
    artwork_slug: p.artwork.id,
    sale_id: p.artwork.saleArtwork.sale._id,
    user_id: p.me.id,
  }))(StripeWrappedConfirmBidRoute)

  return <Component {...props} />
}

export const ConfirmBidRouteFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(TrackingWrappedConfirmBidRoute),
  {
    me: graphql`
      fragment ConfirmBid_me on Me {
        id
        hasQualifiedCreditCards: has_qualified_credit_cards
        ...BidForm_me
      }
    `,
  }
)
