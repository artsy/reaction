import { Flex, Join, Message, Sans, Serif, Spacer } from "@artsy/palette"
import { Status_order } from "__generated__/Status_order.graphql"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import React, { Component } from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { Responsive } from "Utils/Responsive"
import { Helper } from "../../Components/Helper"
import { ShippingAndPaymentSummaryFragmentContainer as ShippingAndPaymentSummary } from "../../Components/ShippingAndPaymentSummary"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "../../Components/TransactionSummary"

export interface StatusProps {
  order: Status_order
  mediator?: {
    trigger: (action: string, config: object) => void
  }
}

export class StatusRoute extends Component<StatusProps> {
  stateCopy = () => {
    const { state, requestedFulfillment } = this.props.order
    switch (state) {
      case "submitted":
        return "Your order has been submitted."
      case "approved":
        return "Your order is confirmed."
      case "fulfilled":
        return requestedFulfillment.__typename === "Ship"
          ? "Your order was shipped."
          : "Your order was picked up."
      case "canceled":
        return "Your order was canceled and refunded."
    }
  }

  messageCopy = () => {
    const { order } = this.props
    const { state, requestedFulfillment } = order
    switch (state) {
      case "submitted":
        return (
          <>
            Thank you for your order. You’ll receive a confirmation email
            shortly. If you have questions, please contact{" "}
            <a href="#">orders@artsy.net</a>.
          </>
        )
      case "approved":
        return requestedFulfillment.__typename === "Ship" ? (
          <>
            The seller will notify you when your order has shipped (typically
            5–7 business days).
          </>
        ) : (
          false
        )
      case "fulfilled":
        return requestedFulfillment.__typename === "Ship" ? (
          <>
            Estimated delivery:
            <br />
            Tracking ID:
          </>
        ) : (
          false
        )
      case "canceled":
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
                    artworkId={order.lineItems.edges[0].node.artwork.id}
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
