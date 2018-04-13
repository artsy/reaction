import { storiesOf } from "@storybook/react"
import React from "react"

import { OrderForm } from "../Forms/OrderForm"

storiesOf("Components/Forms/Order Form", module).add("Order Form", () => {
  return <OrderForm />
})
