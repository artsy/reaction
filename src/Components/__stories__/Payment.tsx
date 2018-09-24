import { storiesOf } from "@storybook/react"
import React from "react"
import PaymentForm from "../Payment/PaymentForm"

import { ContextProvider } from "Artsy/SystemContext"

storiesOf("Components/Payment/Generic Payment Form", module).add(
  "Payment Form",
  () => {
    return (
      <div>
        <ContextProvider>
          <PaymentForm />
        </ContextProvider>
      </div>
    )
  }
)
