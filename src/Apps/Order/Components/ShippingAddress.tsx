import React from "react"

import { Serif } from "@artsy/palette"

export interface ShippingAddressProps {
  name: string
  addressLine1: string
  addressLine2: string | null
  city: string
  postalCode: string
  region: string
}

export const ShippingAddress = ({
  name,
  addressLine1,
  addressLine2,
  city,
  postalCode,
  region,
}: ShippingAddressProps) => {
  const cityLine = city + (postalCode ? ` ${postalCode}` : "")
  return (
    <Serif size="3t" style={{ whiteSpace: "pre-wrap" }}>
      {[name, addressLine1, addressLine2, cityLine, region]
        .filter(Boolean)
        .join("\n")}
    </Serif>
  )
}
