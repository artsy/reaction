import { storiesOf } from "@storybook/react"
import React from "react"

import { OrderForm } from "../OrderForm"

storiesOf("Components/Order Form", module).add("Order Form", () => {
  return <OrderForm />
})
