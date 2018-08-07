import React from "react"

import { Serif, space } from "@artsy/palette"
import { BorderBox } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import {
  CreditCardIcon,
  CreditCardType,
} from "Styleguide/Elements/icons/CreditCardIcon"

interface ShippingAndPaymentDetailsProps {
  address: string
  creditCardLast4digits: string
  creditCardtype: CreditCardType
  creditCardExpiry: string
}

export const ShippingAndPaymentDetails: React.SFC<
  ShippingAndPaymentDetailsProps
> = ({ address, creditCardLast4digits, creditCardtype, creditCardExpiry }) => (
  <Flex flexDirection="column">
    <BorderBox hasSiblings responsive>
      <Serif size="3" color="black100" style={{ whiteSpace: "pre-wrap" }}>
        {address}
      </Serif>
    </BorderBox>
    <BorderBox hasSiblings responsive alignItems="center">
      <CreditCardIcon
        type={creditCardtype}
        style={{ marginRight: space(1), position: "relative", top: "-2px" }}
      />
      <Serif size="3" color="black100">
        •••• {creditCardLast4digits}
        &nbsp; Exp {creditCardExpiry}
      </Serif>
    </BorderBox>
  </Flex>
)
