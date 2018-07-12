import { storiesOf } from "@storybook/react"
import React from "react"

import { OrderForm } from "../Forms/OrderForm"

const submitForm = (values, actions) => () => {
  window.alert(JSON.stringify(values, null, 2))
  actions.setSubmitting(false)
}

storiesOf("Legacy/Components/Forms/Order Form", module).add("Order Form", () => {
  return (
    <OrderForm
      onSubmit={(values, actions) => {
        setTimeout(submitForm(values, actions), 300)
      }}
    />
  )
})
