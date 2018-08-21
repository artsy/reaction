import React from "react"

import { Serif } from "@artsy/palette"

interface ShippingAddressProps {
  shippingName: string
  shippingAddressLine1: string
  shippingAddressLine2: string | null
  shippingCity: string
  shippingPostalCode: string
  shippingRegion: string
}

export const ShippingAddress = ({
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
