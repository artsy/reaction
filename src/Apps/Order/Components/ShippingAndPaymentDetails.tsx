import React from "react"

import { Serif, space } from "@artsy/palette"
import { ShippingAndPaymentDetails_order } from "__generated__/ShippingAndPaymentDetails_order.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { StackableBorderBox } from "Styleguide/Elements/Box"
import { Flex, FlexProps } from "Styleguide/Elements/Flex"
import { CreditCardIcon } from "Styleguide/Elements/icons/CreditCardIcon"

interface ShippingAndPaymentDetailsProps extends FlexProps {
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
    .filter(x => x)
    .join("\n")
}

export const ShippingAndPaymentDetails: React.SFC<
  ShippingAndPaymentDetailsProps
> = ({
  order: {
    fulfillmentType,
    creditCard: { brand, last_digits, expiration_year, expiration_month },
    ...addressProps
  },
  ...others
}) => (
  <Flex flexDirection="column" {...others}>
    <StackableBorderBox flexDirection="column">
      {fulfillmentType === "PICKUP" ? (
        <>
          <Serif size="3" weight="semibold" color="black100">
            Pick up
          </Serif>
          <Serif size="3" color="black100">
            You’ll be appointed an Artsy specialist within 2 business days to
            handle pickup logistics.
          </Serif>
        </>
      ) : (
        <>
          <Serif size="3" weight="semibold" color="black100">
            Ship to
          </Serif>
          <Serif size="3" color="black100" style={{ whiteSpace: "pre-wrap" }}>
            {renderAddress(addressProps)}
          </Serif>
        </>
      )}
    </StackableBorderBox>
    <StackableBorderBox alignItems="center">
      <CreditCardIcon
        type={brand}
        style={{ marginRight: space(1), position: "relative", top: "-2px" }}
      />
      <Serif size="3" color="black100">
        •••• {last_digits}
        &nbsp; Exp {expiration_month}/{expiration_year}
      </Serif>
    </StackableBorderBox>
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
      creditCard {
        brand
        last_digits
        expiration_year
        expiration_month
      }
    }
  `
)
