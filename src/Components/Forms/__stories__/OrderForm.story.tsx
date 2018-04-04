import { storiesOf } from "@storybook/react"
import React from "react"

import { OrderForm } from "../OrderForm"

storiesOf("Components/Forms/Order Form", module).add("Order Form", () => {
  return <OrderForm />
})
