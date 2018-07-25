import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { OrderApp } from "../Order/OrderApp"
import { ShippingRoute } from "../Order/Routes/Shipping"

storiesOf("Apps/Order Page", module).add("Shipping", () => (
  <OrderApp me={null} params={null}>
    <ShippingRoute order={null} />
  </OrderApp>
))
