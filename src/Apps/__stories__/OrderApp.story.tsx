import React from "react"
import { StorybooksRouter } from "Router/StorybooksRouter"
import { storiesOf } from "storybook/storiesOf"
import { routes as orderRoutes } from "../Order/routes"

const mock = {
  Query: () => ({
    me: {
      name: "Alice Jane",
    },
  }),
  Order: (_, { id }) => {
    return {
      id,
    }
  },
}

storiesOf("Apps/Order Page", module)
  .add("Shipping", () => (
    <StorybooksRouter
      routes={orderRoutes}
      initialRoute="/order2/123/shipping"
      mockResolvers={mock}
    />
  ))
  .add("Payment", () => (
    <StorybooksRouter
      routes={orderRoutes}
      initialRoute="/order2/123/payment"
      mockResolvers={mock}
    />
  ))
  .add("Review", () => (
    <StorybooksRouter
      routes={orderRoutes}
      initialRoute="/order2/123/review"
      mockResolvers={mock}
    />
  ))
  .add("Submission", () => (
    <StorybooksRouter
      routes={orderRoutes}
      initialRoute="/order2/123/submission"
      mockResolvers={mock}
    />
  ))
