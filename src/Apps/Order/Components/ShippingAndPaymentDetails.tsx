import React from "react"

import { Sans, Serif, space } from "@artsy/palette"
import { ShippingAndPaymentDetails_order } from "__generated__/ShippingAndPaymentDetails_order.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { StepSummaryItem } from "Styleguide/Components/StepSummaryItem"
import { Flex, FlexProps } from "Styleguide/Elements/Flex"
import { CreditCardIcon } from "Styleguide/Elements/icons/CreditCardIcon"

type ShippingAddressProps = Pick<
  ShippingAndPaymentDetails_order,
  | "shippingName"
  | "shippingAddressLine1"
  | "shippingAddressLine2"
  | "shippingCity"
  | "shippingPostalCode"
  | "shippingRegion"
>

export const Address = ({
  shippingName,
  shippingAddressLine1,
  shippingAddressLine2,
  shippingCity,
  shippingPostalCode,
  shippingRegion,
}: ShippingAddressProps) => {
  const cityLine =
    shippingCity + (shippingPostalCode ? ` ${shippingPostalCode}` : "")
  return (
    <Serif size="3t" style={{ whiteSpace: "pre-wrap" }}>
      {[
        shippingName,
        shippingAddressLine1,
        shippingAddressLine2,
        cityLine,
        shippingRegion,
      ]
        .filter(Boolean)
        .join("\n")}
    </Serif>
  )
}

type CreditCard = ShippingAndPaymentDetails_order["creditCard"]

export const CreditCardDetails = ({
  brand,
  last_digits,
  expiration_month,
  expiration_year,
}: CreditCard) => (
  <Flex alignItems="center">
    <CreditCardIcon type={brand} style={{ marginRight: space(1) }} />
    <Serif
      size="3"
      color="black100"
      style={{ position: "relative", top: "1px" }}
    >
      •••• {last_digits}
      &nbsp; Exp {expiration_month}/{expiration_year}
    </Serif>
  </Flex>
)

export const ShippingAndPaymentReview = ({
  order: { fulfillmentType, lineItems, creditCard, ...address },
  onChangePayment,
  onChangeShipping,
  ...others
}: {
  order: ShippingAndPaymentDetails_order
  onChangePayment(): void
  onChangeShipping(): void
} & FlexProps) => (
  <Flex flexDirection="column" {...others}>
    {fulfillmentType === "PICKUP" ? (
      <StepSummaryItem
        onChange={onChangeShipping}
        title={<>Pick up ({lineItems.edges[0].node.artwork.shippingOrigin})</>}
      >
        <Sans size="2">
          After you place your order, you’ll be appointed an Artsy specialist
          within 2 business days to handle pickup logistics.
        </Sans>
      </StepSummaryItem>
    ) : (
      <StepSummaryItem onChange={onChangeShipping} title="Shipping address">
        <Address {...address} />
      </StepSummaryItem>
    )}
    <StepSummaryItem onChange={onChangePayment} title="Payment method">
      <CreditCardDetails {...creditCard} />
    </StepSummaryItem>
  </Flex>
)

export const ShippingAndPaymentSummary = ({
  order: { fulfillmentType, lineItems, creditCard, ...address },
  ...others
}: {
  order: ShippingAndPaymentDetails_order
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
        <Address {...address} />
      </StepSummaryItem>
    )}
    <StepSummaryItem>
      <CreditCardDetails {...creditCard} />
    </StepSummaryItem>
  </Flex>
)

const shippingAndPaymentDetailsQueryFragment = graphql`
  fragment ShippingAndPaymentDetails_order on Order {
    fulfillmentType
    shippingName
    shippingAddressLine1
    shippingAddressLine2
    shippingCity
    shippingPostalCode
    shippingRegion
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

export const ShippingAndPaymentReviewFragmentContainer = createFragmentContainer(
  ShippingAndPaymentReview,
  shippingAndPaymentDetailsQueryFragment
)

export const ShippingAndPaymentSummaryFragmentContainer = createFragmentContainer(
  ShippingAndPaymentSummary,
  shippingAndPaymentDetailsQueryFragment
)
