import React from "react"

import { Serif, space } from "@artsy/palette"
import { Flex } from "Styleguide/Elements/Flex"
import {
  CreditCardIcon,
  CreditCardType,
} from "Styleguide/Elements/icons/CreditCardIcon"
import { StackableResponsiveBorderBox } from "Styleguide/Elements/StackableResponsiveBorderBox"

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
    <StackableResponsiveBorderBox>
      <Serif size="3" color="black100" style={{ whiteSpace: "pre-wrap" }}>
        {address}
      </Serif>
    </StackableResponsiveBorderBox>
    <StackableResponsiveBorderBox alignItems="center">
      <CreditCardIcon
        type={creditCardtype}
        style={{ marginRight: space(1), position: "relative", top: "-2px" }}
      />
      <Serif size="3" color="black100">
        •••• {creditCardLast4digits}
        &nbsp; Exp {creditCardExpiry}
      </Serif>
    </StackableResponsiveBorderBox>
  </Flex>
)
