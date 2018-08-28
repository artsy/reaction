import { Serif } from "@artsy/palette"
import { ShippingAndPaymentSummary_order } from "__generated__/ShippingAndPaymentSummary_order.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { StepSummaryItem } from "Styleguide/Components/StepSummaryItem"
import { Flex, FlexProps } from "Styleguide/Elements/Flex"
import { CreditCardDetails } from "./CreditCardDetails"
import { ShippingAddress } from "./ShippingAddress"

export const ShippingAndPaymentSummary = ({
  order: {
    requestedFulfillment: {
      fulfillmentType,
      name,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      region,
    },
    lineItems,
    creditCard,
  },
  ...others
}: {
  order: ShippingAndPaymentSummary_order
} & FlexProps) => (
  <Flex flexDirection="column" {...others}>
    {fulfillmentType === "PICKUP" ? (
      <StepSummaryItem
        title={<>Pick up ({lineItems.edges[0].node.artwork.shippingOrigin})</>}
      >
        <Serif size="3t">
          You’ll be appointed an Artsy specialist within 2 business days to
          handle pickup logistics.
        </Serif>
      </StepSummaryItem>
    ) : (
      <StepSummaryItem title="Ship to">
        <ShippingAddress
          shippingName={name}
          shippingAddressLine1={addressLine1}
          shippingAddressLine2={addressLine2}
          shippingCity={city}
          shippingPostalCode={postalCode}
          shippingRegion={region}
        />
      </StepSummaryItem>
    )}
    <StepSummaryItem>
      <CreditCardDetails {...creditCard} />
    </StepSummaryItem>
  </Flex>
)

export const ShippingAndPaymentSummaryFragmentContainer = createFragmentContainer(
  ShippingAndPaymentSummary,
  graphql`
    fragment ShippingAndPaymentSummary_order on Order {
      requestedFulfillment {
        ... on Pickup {
          fulfillmentType
        }
        ... on Ship {
          name
          addressLine1
          addressLine2
          city
          postalCode
          region
        }
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
