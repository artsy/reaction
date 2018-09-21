import {
  OrderWithShippingDetails,
  PickupOrder,
} from "Apps/__test__/Fixtures/Order"
import { StorybooksRouter } from "Artsy/Router"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as orderRoutes } from "../Order/routes"

const mock = (orderDetails: any = OrderWithShippingDetails) => ({
  Query: () => ({
    me: {
      name: "Alice Jane",
    },
  }),
  Order: (_, { id, ...others }) => {
    return {
      ...orderDetails,
      id,
      ...others,
    }
  },
})

const Router = props => (
  <StorybooksRouter
    routes={orderRoutes}
    mockResolvers={mock()}
    historyOptions={{ useBeforeUnload: true }}
    {...props}
  />
)

storiesOf("Apps/Order Page", module)
  .add("Shipping", () => <Router initialRoute="/order2/123/shipping" />)
  .add("Review", () => <Router initialRoute="/order2/123/review" />)
  .add("Status", () => <Router initialRoute="/order2/123/status" />)

storiesOf("Apps/Order Page/Status", module)
  .add("submitted", () => (
    <Router
      initialRoute="/order2/123/status"
      mockResolvers={mock({ ...OrderWithShippingDetails, state: "submitted" })}
    />
  ))
  .add("approved (ship)", () => (
    <Router
      initialRoute="/order2/123/status"
      mockResolvers={mock({ ...OrderWithShippingDetails, state: "approved" })}
    />
  ))
  .add("approved (pickup)", () => (
    <Router
      initialRoute="/order2/123/status"
      mockResolvers={mock({ ...PickupOrder, state: "approved" })}
    />
  ))
  .add("fulfilled (ship)", () => (
    <Router
      initialRoute="/order2/123/status"
      mockResolvers={mock({ ...OrderWithShippingDetails, state: "fulfilled" })}
    />
  ))
  .add("fulfilled (pickup)", () => (
    <Router
      initialRoute="/order2/123/status"
      mockResolvers={mock({ ...PickupOrder, state: "fulfilled" })}
    />
  ))
  .add("canceled (ship)", () => (
    <Router
      initialRoute="/order2/123/status"
      mockResolvers={mock({ ...OrderWithShippingDetails, state: "canceled" })}
    />
  ))
  .add("canceled (pickup)", () => (
    <Router
      initialRoute="/order2/123/status"
      mockResolvers={mock({ ...PickupOrder, state: "canceled" })}
    />
  ))

storiesOf("Apps/Order Page/Payment", module)
  .add("With 'Ship'", () => <Router initialRoute="/order2/123/payment" />)
  .add("With 'Pickup'", () => (
    <Router
      initialRoute="/order2/123/payment"
      mockResolvers={mock(PickupOrder)}
    />
  ))
