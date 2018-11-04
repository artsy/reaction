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
import { Mediator, SystemContextConsumer } from "Artsy/SystemContext"
import { Router } from "found"
import React, { Component } from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"
import { get } from "Utils/get"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "../../Components/ArtworkSummaryItem"
import { CreditCardSummaryItemFragmentContainer as CreditCardSummaryItem } from "../../Components/CreditCardSummaryItem"
import { Helper } from "../../Components/Helper"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "../../Components/ShippingSummaryItem"

export interface StatusProps {
  order: Status_order
  mediator: Mediator
  router: Router
}

export class StatusRoute extends Component<StatusProps> {
  stateCopy = () => {
    const { state, requestedFulfillment, mode, stateReason } = this.props.order
    const isOfferFlow = mode === "OFFER"
    const buyerRejectedOffer = stateReason === "buyer_rejected"
    switch (state) {
      case "SUBMITTED":
        return isOfferFlow
          ? "Your offer has been submitted."
          : "Your order has been submitted."
      case "APPROVED":
        return isOfferFlow ? "Offer accepted" : "Your order is confirmed."
      case "FULFILLED":
        return requestedFulfillment.__typename === "Ship"
          ? "Your order has shipped."
          : "Your order has been picked up."
      case "CANCELED":
        if (buyerRejectedOffer) {
          return "Offer declined"
        } else {
          return "Your order was canceled and refunded."
        }
    }
  }

  componentDidMount() {
    this.props.mediator.trigger("order:status")
  }

  render() {
    const { order } = this.props

    const isOfferFlow = order.mode === "OFFER"
    const buyerRejectedOffer = order.stateReason === "buyer_rejected"
    const message = isOfferFlow
      ? offerMessages[order.state] || orderMessages[order.state]
      : orderMessages[order.state]
    const flowName = isOfferFlow ? "Offer" : "Order"
    const userMessage = message && message(this.props)

    return (
      <HorizontalPadding>
        <Serif size="6" weight="regular" color="black100">
          {this.stateCopy()}
        </Serif>
        <Sans size="2" weight="regular" color="black60" mb={[2, 3]}>
          {flowName} #{order.code}
        </Sans>
        <TwoColumnLayout
          Content={
            <>
              <Title>{flowName} status | Artsy</Title>
              <Join separator={<Spacer mb={[2, 3]} />}>
                {userMessage && <Message p={[2, 3]}>{userMessage}</Message>}
                {buyerRejectedOffer ? (
                  <Button
                    onClick={() => {
                      this.props.router.push(`/`)
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
            !buyerRejectedOffer && (
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

const StatusRouteWrapper = props => (
  <SystemContextConsumer>
    {({ mediator }) => {
      return <StatusRoute {...props} mediator={mediator} />
    }}
  </SystemContextConsumer>
)

const offerMessages = {
  SUBMITTED: (props: StatusProps) => {
    const artwork = get(props.order, o => o.lineItems.edges[0].node.artwork)
    return (
      <>
        You’ll receive a confirmation email. The seller has{" "}
        <Sans size="3t" weight="medium" display="inline">
          48 hours
        </Sans>{" "}
        to respond to your offer. If the gallery doesn’t respond in time, your
        offer will be canceled.
        <br />
        <br />
        {artwork.is_acquireable ? (
          <>
            <Sans size="3t" weight="medium" display="inline">
              Keep in mind
            </Sans>{" "}
            making an offer doesn’t guarantee you the work. Another buyer could
            make a higher offer or{" "}
            <a href={`/artwork/${artwork.id}`}>buy now</a> at list price.
          </>
        ) : (
          <>
            <Sans size="3t" weight="medium" display="inline">
              Keep in mind
            </Sans>{" "}
            making an offer doesn’t guarantee you the work. Another buyer could
            make a higher offer.
          </>
        )}
      </>
    )
  },
  APPROVED: () => (
    <>
      Thank you for your purchase. You will receive a confirmation email. The
      seller will notify you when your order has shipped, typically 5–7 business
      days. If you have questions, please contact{" "}
      <a href="mailto:orders@artsy.net">orders@artsy.net</a>.
    </>
  ),
  CANCELED: (props: StatusProps) =>
    props.order.stateReason === "buyer_rejected" ? (
      <>
        <p>
          Thank you for your response. The seller will be informed of your
          decision to end the negotiation process.
        </p>
        <p>
          We’d love to get your feedback. Contact{" "}
          <a href="mailto:orders@artsy.net">orders@artsy.net</a> with any
          comments you have.
        </p>
      </>
    ) : (
      canceledOrderMessage
    ),
}
const orderMessages = {
  SUBMITTED: () => (
    <>
      Thank you for your purchase. You will receive a confirmation email within
      2 days.
    </>
  ),
  APPROVED: ({ order: { requestedFulfillment } }) => {
    return requestedFulfillment.__typename === "Ship" ? (
      <>
        Thank you for your purchase. You will be notified when the work has
        shipped, typically within 5–7 business days.
      </>
    ) : (
      <>
        Thank you for your purchase. A specialist will contact you within 2
        business days to coordinate pickup.
      </>
    )
  },
  FULFILLED: ({ order }) => {
    const fulfillment = get(
      order,
      o => o.lineItems.edges[0].node.fulfillments.edges[0].node
    )
    if (!fulfillment) {
      return false
    }
    const { requestedFulfillment } = order
    return requestedFulfillment.__typename === "Ship" ? (
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
            <>Tracking Info: {fulfillment.trackingId}</>
            <br />
          </>
        )}
        {fulfillment.estimatedDelivery && (
          <>Estimated delivery: {fulfillment.estimatedDelivery}</>
        )}
      </>
    ) : (
      false
    )
  },
  CANCELED: () => canceledOrderMessage,
}

const canceledOrderMessage = (
  <>
    Please allow 5–7 business days for the refund to appear on your bank
    statement. Contact <a href="mailto:orders@artsy.net">orders@artsy.net</a>{" "}
    with any questions.
  </>
)

export const StatusFragmentContainer = createFragmentContainer(
  StatusRouteWrapper,
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
