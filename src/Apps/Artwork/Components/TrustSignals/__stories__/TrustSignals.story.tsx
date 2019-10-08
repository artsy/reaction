import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { SecurePayment } from "../SecurePayment"

storiesOf("Apps/Artwork/Trust Signals", module).add("Secure Payment", () => {
  return <SecurePayment />
})
