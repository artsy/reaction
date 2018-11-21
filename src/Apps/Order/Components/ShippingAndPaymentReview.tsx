import { Flex, FlexProps, Sans, Serif } from "@artsy/palette"
import { ShippingAndPaymentReview_order } from "__generated__/ShippingAndPaymentReview_order.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { StepSummaryItem } from "Styleguide/Components/StepSummaryItem"
import { CreditCardDetails } from "./CreditCardDetails"
import { ShippingAddressFragmentContainer as ShippingAddress } from "./ShippingAddress"

export const ShippingAndPaymentReview = ({
  order: {
    requestedFulfillment,
    lineItems,
    creditCard,
    mode,
    totalListPrice,
    itemsTotal,
  },
  onChangePayment,
  onChangeShipping,
  onChangeOffer,
  ...others
}: {
  order: ShippingAndPaymentReview_order
  onChangePayment(): void
  onChangeShipping(): void
  onChangeOffer(): void
} & FlexProps) => {
  return (
    <Flex flexDirection="column" {...others}>
      {mode === "OFFER" && (
        <StepSummaryItem onChange={onChangeOffer} title="Your offer">
          <Serif size={["2", "3t"]} color="black100">
            {itemsTotal}
          </Serif>
          <Sans size="2" color="black60">
            List price: {totalListPrice}
          </Sans>
        </StepSummaryItem>
      )}
      {requestedFulfillment.__typename === "Ship" ? (
        <StepSummaryItem onChange={onChangeShipping} title="Shipping address">
          <ShippingAddress ship={requestedFulfillment} />
        </StepSummaryItem>
      ) : (
        <StepSummaryItem
          onChange={onChangeShipping}
          title={
            <>Pick up ({lineItems.edges[0].node.artwork.shippingOrigin})</>
          }
        >
          <Sans size="2">
            After your order is confirmed, a specialist will contact you within
            2 business days to coordinate pickup.
          </Sans>
        </StepSummaryItem>
      )}
      <StepSummaryItem onChange={onChangePayment} title="Payment method">
        <CreditCardDetails {...creditCard} />
      </StepSummaryItem>
    </Flex>
  )
}

export const ShippingAndPaymentReviewFragmentContainer = createFragmentContainer(
  ShippingAndPaymentReview,
  graphql`
    fragment ShippingAndPaymentReview_order on Order {
      mode
      totalListPrice(precision: 2)
      itemsTotal(precision: 2)
      requestedFulfillment {
        __typename
        ...ShippingAddress_ship
      }
      lineItems {
        edges {
          node {
            artwork {
              shippingOrigin
            }
          }
        }
      }
      creditCard {
        brand
        last_digits
        expiration_year
        expiration_month
      }
    }
  `
)
