import { Serif } from "@artsy/palette"
import React from "react"

import { COUNTRY_CODE_TO_COUNTRY_NAME } from "Styleguide/Components"

export interface ShippingAddressProps {
  name: string
  addressLine1: string
  addressLine2?: string | null
  city: string
  postalCode: string
  region: string
  country: string
}

export const ShippingAddress = ({
  name,
  addressLine1,
  addressLine2,
  city,
  postalCode,
  region,
  country,
}: ShippingAddressProps) => {
  return (
    <>
      <Serif size="3t">{name}</Serif>
      <Serif size="3t">
        {[addressLine1, (addressLine2 || "").trim()].filter(Boolean).join(", ")}
      </Serif>
      <Serif size="3t">
        {city}, {region} {postalCode}
      </Serif>
      <Serif size="3t">
        {COUNTRY_CODE_TO_COUNTRY_NAME[country] || country}
      </Serif>
    </>
  )
}
