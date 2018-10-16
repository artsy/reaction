import { Flex, FlexProps, Serif } from "@artsy/palette"
import { ShippingAndPaymentSummary_order } from "__generated__/ShippingAndPaymentSummary_order.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { StepSummaryItem } from "Styleguide/Components/StepSummaryItem"
import { CreditCardDetails } from "./CreditCardDetails"
import { ShippingAddressFragmentContainer as ShippingAddress } from "./ShippingAddress"

/**
 * When the order is completed or canceled state we _don't_ want to tell
 * the user that they'll be assigned an artsy specialist as it doesn't make
 * sense in that context
 */
const showPickupCopy = state => state !== "FULFILLED" && state !== "CANCELED"

export const ShippingAndPaymentSummary = ({
  order: { state, requestedFulfillment, lineItems, creditCard },
  ...others
}: {
  order: ShippingAndPaymentSummary_order
} & FlexProps) => {
  return (
    <Flex flexDirection="column" {...others}>
      {requestedFulfillment.__typename === "Ship" ? (
        <StepSummaryItem title="Ship to">
          <ShippingAddress ship={requestedFulfillment} />
        </StepSummaryItem>
      ) : (
        <StepSummaryItem
          title={
            <>Pick up ({lineItems.edges[0].node.artwork.shippingOrigin})</>
          }
          /* Fixes spacing issues with title when no pickup description copy is present */
          mb={showPickupCopy(state) ? undefined : -1}
        >
          {showPickupCopy(state) && (
            <Serif size="3t">
              After your order is confirmed, a specialist will contact you
              within 2 business days to coordinate pickup.
            </Serif>
          )}
        </StepSummaryItem>
      )}
      <StepSummaryItem>
        <CreditCardDetails {...creditCard} />
      </StepSummaryItem>
    </Flex>
  )
}

export const ShippingAndPaymentSummaryFragmentContainer = createFragmentContainer(
  ShippingAndPaymentSummary,
  graphql`
    fragment ShippingAndPaymentSummary_order on Order {
      state
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
