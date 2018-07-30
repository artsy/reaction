import React from "react"
import { StorybooksRouter } from "Router/StorybooksRouter"
import { storiesOf } from "storybook/storiesOf"
import { routes as orderRoutes } from "../Order/routes"

storiesOf("Apps/Order Page", module)
  .add("Shipping", () => (
    <StorybooksRouter
      routes={orderRoutes}
      initialRoute="/order2/123/shipping"
      mockResolvers={{
        Query: () => ({
          me: {
            name: "Alice Jane",
          },
        }),
      }}
    />
  ))
  .add("Payment", () => (
    <StorybooksRouter
      routes={orderRoutes}
      initialRoute="/order2/123/payment"
      mockResolvers={{
        Query: () => ({
          me: {
            name: "Alice Jane",
          },
        }),
      }}
    />
  ))
