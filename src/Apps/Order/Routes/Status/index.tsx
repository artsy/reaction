import {
  Button,
  Flex,
  Join,
  Message,
  Sans,
  Serif,
  Spacer,
} from "@artsy/palette"
import { Status_order } from "__generated__/Status_order.graphql"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { Router } from "found"
import React, { Component } from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "../../Components/ArtworkSummaryItem"
import { CreditCardSummaryItemFragmentContainer as CreditCardSummaryItem } from "../../Components/CreditCardSummaryItem"
import { Helper } from "../../Components/Helper"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "../../Components/ShippingSummaryItem"

const logger = createLogger("Order/Routes/Status/index.tsx")

interface StatusCopy {
  title: React.ReactNode
  description: React.ReactNode
}

export interface StatusProps {
  order: Status_order
  router: Router
}

const Paragraph = styled.p`
  margin-top: 0;

  :last-child {
    margin-bottom: 0;
  }
`

export class StatusRoute extends Component<StatusProps> {
  getStatusCopy(): StatusCopy {
    const { state, requestedFulfillment, mode } = this.props.order
    const isOfferFlow = mode === "OFFER"
    const isShip = requestedFulfillment.__typename === "Ship"

    switch (state) {
      case "SUBMITTED":
        return isOfferFlow
          ? {
              title: "Your offer has been submitted",
              description: (
                <>
                  The seller has 48 hours to respond to your offer. Keep in mind
                  making an offer doesn’t guarantee you the work.
                </>
              ),
            }
          : {
              title: "Your order has been submitted",
              description: (
                <>
                  Thank you for your purchase. You will receive a confirmation
                  email within 2 days.
                </>
              ),
            }
      case "APPROVED":
        return {
          title: isOfferFlow ? "Offer accepted" : "Your order is confirmed",
          description: isShip ? (
            <>
              Thank you for your purchase. You will be notified when the work
              has shipped, typically within 5–7 business days.
            </>
          ) : (
            <>
              Thank you for your purchase. A specialist will contact you within
              2 business days to coordinate pickup.
            </>
          ),
        }
      case "FULFILLED": {
        return isShip
          ? {
              title: "Your order has shipped",
              description: this.getFulfilmentDescription(),
            }
          : {
              title: "Your order has been picked up",
              description: null,
            }
      }
      case "CANCELED":
      case "REFUNDED":
        return isOfferFlow && state === "CANCELED"
          ? this.getCanceledOfferOrderCopy()
          : {
              title: "Your order was canceled and refunded",
              description: (
                <>
                  Please allow 5–7 business days for the refund to appear on
                  your bank statement. Contact{" "}
                  <a href="mailto:orders@artsy.net">orders@artsy.net</a> with
                  any questions.
                </>
              ),
            }
      default:
        // This should not happen. Check the order states are all accounted for:
        // https://github.com/artsy/exchange/blob/master/app/models/order.rb
        // (Aside from PENDING and ABANDONED)
        logger.error(`Unhandled order state: ${state}`)
        return {
          title: "Your order",
          description: null,
        }
    }
  }

  getCanceledOfferOrderCopy(): StatusCopy {
    const { stateReason } = this.props.order
    switch (stateReason) {
      case "buyer_rejected":
        return {
          title: "Offer declined",
          description: (
            <>
              <Paragraph>
                Thank you for your response. The seller will be informed of your
                decision to end the negotiation process.
              </Paragraph>
              <Paragraph>
                We’d love to get your feedback. Contact{" "}
                <a href="mailto:orders@artsy.net">orders@artsy.net</a> with any
                comments you have.
              </Paragraph>
            </>
          ),
        }
      case "seller_rejected_offer_too_low":
      case "seller_rejected_shipping_unavailable":
      case "seller_rejected":
      case "seller_rejected_artwork_unavailable":
      case "seller_rejected_other":
        return {
          title: "Offer declined",
          description: (
            <>
              Sorry, the seller declined your offer and has ended the
              negotiation process.
            </>
          ),
        }
      case "buyer_lapsed":
        return {
          title: "Offer expired",
          description: (
            <>The seller’s offer expired because you didn’t respond in time.</>
          ),
        }
      case "seller_lapsed":
        return {
          title: "Offer expired",
          description: (
            <>
              Your offer expired because the seller didn’t respond to your offer
              in time.
            </>
          ),
        }
      default:
        // This should not happen. Check the cancel reasons are all accounted for:
        // https://github.com/artsy/exchange/blob/master/app/models/order.rb
        logger.error(`Unhandled cancellation reason: ${stateReason}`)
        return {
          title: "Offer declined",
          description: null,
        }
    }
  }

  getFulfilmentDescription(): React.ReactNode {
    const fulfillment = get(
      this.props.order,
      o => o.lineItems.edges[0].node.fulfillments.edges[0].node
    )

    if (!fulfillment) {
      return null
    }

    return (
      <>
        Your work is on its way.
        <br />
        <br />
        {fulfillment.courier && (
          <>
            Shipper: {fulfillment.courier}
            <br />
          </>
        )}
        {fulfillment.trackingId && (
          <>
            <>Tracking info: {fulfillment.trackingId}</>
            <br />
          </>
        )}
        {fulfillment.estimatedDelivery && (
          <>Estimated delivery: {fulfillment.estimatedDelivery}</>
        )}
      </>
    )
  }

  render() {
    const { order } = this.props

    const isOfferFlow = order.mode === "OFFER"
    const offerOrderCanceled = isOfferFlow && order.state === "CANCELED"
    const flowName = isOfferFlow ? "Offer" : "Order"
    const { title, description } = this.getStatusCopy()

    return (
      <HorizontalPadding>
        <Serif size="6" weight="regular" color="black100">
          {title}
        </Serif>
        <Sans size="2" weight="regular" color="black60" mb={[2, 3]}>
          {flowName} #{order.code}
        </Sans>
        <TwoColumnLayout
          Content={
            <>
              <Title>{flowName} status | Artsy</Title>
              <Join separator={<Spacer mb={[2, 3]} />}>
                {description && <Message p={[2, 3]}>{description}</Message>}
                {offerOrderCanceled ? (
                  <Button
                    onClick={() => {
                      window.location.href = "/"
                    }}
                    size="large"
                    width="100%"
                  >
                    Back to Artsy
                  </Button>
                ) : (
                  <Flex flexDirection="column">
                    <ArtworkSummaryItem order={order} />
                    <TransactionDetailsSummaryItem
                      order={order}
                      useLastSubmittedOffer
                    />
                  </Flex>
                )}
              </Join>
              <Spacer mb={[2, 3]} />
            </>
          }
          Sidebar={
            !offerOrderCanceled && (
              <Flex flexDirection="column">
                <Flex flexDirection="column">
                  <ShippingSummaryItem order={order} />
                  <CreditCardSummaryItem order={order} />
                </Flex>
                <Spacer mb={[2, 3]} />
                <Helper
                  artworkId={get(
                    order,
                    o => o.lineItems.edges[0].node.artwork.id
                  )}
                />
              </Flex>
            )
          }
        />
      </HorizontalPadding>
    )
  }
}

export const StatusFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(StatusRoute),
  graphql`
    fragment Status_order on Order {
      __typename
      id
      code
      state
      mode
      stateReason
      requestedFulfillment {
        ... on Ship {
          __typename
        }
        ... on Pickup {
          __typename
        }
      }
      ...ArtworkSummaryItem_order
      ...TransactionDetailsSummaryItem_order
      ...ShippingSummaryItem_order
      ...CreditCardSummaryItem_order
      lineItems {
        edges {
          node {
            fulfillments {
              edges {
                node {
                  courier
                  trackingId
                  estimatedDelivery(format: "MMM Do, YYYY")
                }
              }
            }
            artwork {
              id
              is_acquireable
              ...ItemReview_artwork
            }
          }
        }
      }
      ... on OfferOrder {
        myLastOffer {
          id
          amount(precision: 2)
          amountCents
          shippingTotal(precision: 2)
          shippingTotalCents
          taxTotal(precision: 2)
          taxTotalCents
        }
      }
    }
  `
)
