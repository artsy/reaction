import {
  OrderWithShippingDetails,
  PickupOrder,
} from "Apps/__test__/Fixtures/Order"
import { StorybooksRouter } from "Artsy/Router"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as orderRoutes } from "../Order/routes"

const mock = {
  Query: () => ({
    me: {
      name: "Alice Jane",
    },
  }),
  Order: (_, { id, ...others }) => {
    return {
      ...OrderWithShippingDetails,
      id,
      ...others,
      state: "pending",
    }
  },
}

const Router = props => (
  <StorybooksRouter
    routes={orderRoutes}
    mockResolvers={mock}
    historyOptions={{ useBeforeUnload: true }}
    {...props}
  />
)

storiesOf("Apps/Order Page", module)
  .add("Shipping", () => <Router initialRoute="/order2/123/shipping" />)
  .add("Review", () => <Router initialRoute="/order2/123/review" />)
  .add("Status", () => <Router initialRoute="/order2/123/status" />)

storiesOf("Apps/Order Page/Payment", module)
  .add("With 'Ship'", () => <Router initialRoute="/order2/123/payment" />)
  .add("With 'Pickup'", () => (
    <Router
      initialRoute="/order2/123/payment"
      mockResolvers={{
        ...mock,
        Order: (_, { id, ...others }) => ({
          ...PickupOrder,
          id,
          ...others,
        }),
      }}
    />
  ))
