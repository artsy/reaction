import { Flex, Join, Message, Sans, Serif, Spacer } from "@artsy/palette"
import { Status_order } from "__generated__/Status_order.graphql"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { Mediator } from "Artsy/SystemContext"
import React, { Component } from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"
import { Responsive } from "Utils/Responsive"
import { Helper } from "../../Components/Helper"
import { ShippingAndPaymentSummaryFragmentContainer as ShippingAndPaymentSummary } from "../../Components/ShippingAndPaymentSummary"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "../../Components/TransactionSummary"

export interface StatusProps {
  order: Status_order
  mediator?: Mediator
}

export class StatusRoute extends Component<StatusProps> {
  stateCopy = () => {
    const { state, requestedFulfillment } = this.props.order
    switch (state) {
      case "SUBMITTED":
        return "Your order has been submitted."
      case "APPROVED":
        return "Your order is confirmed."
      case "FULFILLED":
        return requestedFulfillment.__typename === "Ship"
          ? "Your order has shipped."
          : "Your order has been picked up."
      case "CANCELED":
        return "Your order was canceled and refunded."
    }
  }

  messageCopy = () => {
    const { order } = this.props
    const { state, requestedFulfillment } = order
    switch (state) {
      case "SUBMITTED":
        return (
          <>
            Thank you for your purchase. You will receive a confirmation email
            within 2 days.
          </>
        )
      case "APPROVED":
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
      case "FULFILLED":
        const fulfillment = get(
          order,
          o => o.lineItems.edges[0].node.fulfillments.edges[0].node
        )
        if (!fulfillment) {
          return false
        }
        return requestedFulfillment.__typename === "Ship" ? (
          <>
            <>Your work is on its way.</>
            <br />
            <br />
            {fulfillment.courier && (
              <>
                Shipper: {fulfillment.courier} <br />
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
      case "CANCELED":
        return (
          <>
            The work is no longer available.
            <br />
            <br />
            Please allow 5-7 business days for the refund to appear on your bank
            statement.
          </>
        )
    }
  }

  render() {
    const { order } = this.props

    const message = this.messageCopy()

    return (
      <Responsive>
        {({ xs }) => (
          <>
            <Serif size="6" weight="regular" color="black100">
              {this.stateCopy()}
            </Serif>
            <Sans size="2" weight="regular" color="black60" mb={[2, 3]}>
              Order #{order.code}
            </Sans>
            <TwoColumnLayout
              Content={
                <>
                  <Title>Order status | Artsy</Title>
                  <Join separator={<Spacer mb={[2, 3]} />}>
                    {message && <Message>{message}</Message>}
                    <TransactionSummary order={order} />
                  </Join>
                  <Spacer mb={[2, 3]} />
                </>
              }
              Sidebar={
                <Flex flexDirection="column">
                  <ShippingAndPaymentSummary order={order} mb={[2, 3]} />
                  <Helper
                    artworkId={get(
                      order,
                      o => o.lineItems.edges[0].node.artwork.id
                    )}
                  />
                </Flex>
              }
            />
          </>
        )}
      </Responsive>
    )
  }
}

export const StatusFragmentContainer = createFragmentContainer(
  StatusRoute,
  graphql`
    fragment Status_order on Order {
      id
      code
      state
      requestedFulfillment {
        ... on Ship {
          __typename
        }
        ... on Pickup {
          __typename
        }
      }
      ...TransactionSummary_order
      ...ShippingAndPaymentSummary_order
      lineItems {
        edges {
          node {
            fulfillments {
              edges {
                node {
                  courier
                  trackingId
                  estimatedDelivery
                }
              }
            }
            artwork {
              id
              ...ItemReview_artwork
            }
          }
        }
      }
    }
  `
)
