import {
  mockResolver,
  OrderWithShippingDetails,
  PickupOrder,
} from "Apps/__test__/Fixtures/Order"
import { ClientRouter } from "Artsy/Router/Components/ClientRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as orderRoutes } from "../Order/routes"

const Router = props => (
  <ClientRouter
    routes={orderRoutes}
    mockResolvers={mockResolver()}
    historyOptions={{ useBeforeUnload: true }}
    {...props}
  />
)

storiesOf("Apps/Order Page", module)
  .add("Shipping", () => <Router initialRoute="/order2/123/shipping" />)
  .add("Review", () => <Router initialRoute="/order2/123/review" />)

storiesOf("Apps/Order Page/Status", module)
  .add("submitted", () => (
    <Router
      initialRoute="/order2/123/status"
      mockResolvers={mockResolver({
        ...OrderWithShippingDetails,
        state: "SUBMITTED",
      })}
    />
  ))
  .add("approved (ship)", () => (
    <Router
      initialRoute="/order2/123/status"
      mockResolvers={mockResolver({
        ...OrderWithShippingDetails,
        state: "APPROVED",
      })}
    />
  ))
  .add("approved (pickup)", () => (
    <Router
      initialRoute="/order2/123/status"
      mockResolvers={mockResolver({ ...PickupOrder, state: "APPROVED" })}
    />
  ))
  .add("fulfilled (ship)", () => (
    <Router
      initialRoute="/order2/123/status"
      mockResolvers={mockResolver({
        ...OrderWithShippingDetails,
        state: "FULFILLED",
      })}
    />
  ))
  .add("fulfilled (pickup)", () => (
    <Router
      initialRoute="/order2/123/status"
      mockResolvers={mockResolver({ ...PickupOrder, state: "FULFILLED" })}
    />
  ))
  .add("canceled (ship)", () => (
    <Router
      initialRoute="/order2/123/status"
      mockResolvers={mockResolver({
        ...OrderWithShippingDetails,
        state: "CANCELED",
      })}
    />
  ))
  .add("canceled (pickup)", () => (
    <Router
      initialRoute="/order2/123/status"
      mockResolvers={mockResolver({ ...PickupOrder, state: "CANCELED" })}
    />
  ))

storiesOf("Apps/Order Page/Payment", module)
  .add("With 'Ship'", () => <Router initialRoute="/order2/123/payment" />)
  .add("With 'Pickup'", () => (
    <Router
      initialRoute="/order2/123/payment"
      mockResolvers={mockResolver(PickupOrder)}
    />
  ))
