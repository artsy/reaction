import React from "react"

import { Serif, space } from "@artsy/palette"
import { ShippingAndPaymentDetails_order } from "__generated__/ShippingAndPaymentDetails_order.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { StepSummaryItem } from "Styleguide/Components/StepSummaryItem"
import { Flex, FlexProps } from "Styleguide/Elements/Flex"
import { CreditCardIcon } from "Styleguide/Elements/icons/CreditCardIcon"

interface ShippingAndPaymentDetailsProps extends FlexProps {
  onShippingChange?: () => void
  onPaymentChange?: () => void
  order: ShippingAndPaymentDetails_order
}

const renderAddress = ({
  shippingName,
  shippingAddressLine1,
  shippingAddressLine2,
  shippingCity,
  shippingPostalCode,
  shippingRegion,
}: {
  shippingName: string
  shippingAddressLine1: string
  shippingAddressLine2: string | null
  shippingCity: string
  shippingPostalCode: string | null
  shippingRegion: string | null
}) => {
  const cityLine =
    shippingCity + (shippingPostalCode ? ` ${shippingPostalCode}` : "")
  return [
    shippingName,
    shippingAddressLine1,
    shippingAddressLine2,
    cityLine,
    shippingRegion,
  ]
    .filter(Boolean)
    .join("\n")
}

export const ShippingAndPaymentDetails: React.SFC<
  ShippingAndPaymentDetailsProps
> = ({
  onShippingChange,
  onPaymentChange,
  order: {
    fulfillmentType,
    creditCard: { brand, last_digits, expiration_year, expiration_month },
    lineItems,
    ...addressProps
  },
  ...others
}) => (
  <Flex flexDirection="column" {...others}>
    {fulfillmentType === "PICKUP" ? (
      <StepSummaryItem
        onChange={onShippingChange}
        title={<>Pick up ({lineItems.edges[0].node.artwork.shippingOrigin})</>}
      >
        You’ll be appointed an Artsy specialist within 2 business days to handle
        pickup logistics.
      </StepSummaryItem>
    ) : (
      <StepSummaryItem
        onChange={onShippingChange}
        title={onShippingChange ? "Shipping address" : "Ship to"}
      >
        <div style={{ whiteSpace: "pre-wrap" }}>
          {renderAddress(addressProps)}
        </div>
      </StepSummaryItem>
    )}
    <StepSummaryItem
      onChange={onPaymentChange}
      title={onPaymentChange ? "Payment method" : null}
    >
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
    </StepSummaryItem>
  </Flex>
)

export const ShippingAndPaymentDetailsFragmentContainer = createFragmentContainer(
  ShippingAndPaymentDetails,
  graphql`
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
)
