import React from "react"

import { CreditCardIcon, Flex, Serif, space } from "@artsy/palette"

export const CreditCardDetails = ({
  brand,
  last_digits,
  expiration_month,
  expiration_year,
  responsive = true,
}: {
  brand: string
  last_digits: string
  expiration_month: number
  expiration_year: number
  responsive?: boolean
}) => (
  <Flex alignItems="center">
    <CreditCardIcon
      type={brand}
      style={{ marginRight: space(1) }}
      width="25px"
    />
    <Serif
      size={responsive ? ["2", "3"] : "3"}
      color="black100"
      style={{ position: "relative", top: "1px" }}
    >
      •••• {last_digits}
      &nbsp;&nbsp; Exp {expiration_month.toString().padStart(2, "0")}/
      {expiration_year.toString().slice(-2)}
    </Serif>
  </Flex>
)
