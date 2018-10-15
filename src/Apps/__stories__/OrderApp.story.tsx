import {
  mockResolver,
  OrderWithShippingDetails,
  PickupOrder,
  UntouchedOrder,
} from "Apps/__test__/Fixtures/Order"
import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as orderRoutes } from "../Order/routes"

const Router = props => (
  <MockRouter
    routes={orderRoutes}
    mockResolvers={mockResolver()}
    historyOptions={{ useBeforeUnload: true }}
    {...props}
  />
)

storiesOf("Apps/Order Page", module)
  .add("Shipping - Pre-filled", () => (
    <Router initialRoute="/orders/123/shipping" />
  ))
  .add("Shipping - Untouched Order", () => (
    <Router
      // The UntouchedOrder has a specified requestedFulfillment, but it should be null.
      // Unfortunately, enough of our tests use UntouchedOrder to change it, so we'll specify it here to avoid breaking our story.
      mockResolvers={mockResolver({
        ...UntouchedOrder,
        requestedFulfillment: null,
      })}
      initialRoute="/orders/123/shipping"
    />
  ))
  .add("Review", () => <Router initialRoute="/orders/123/review" />)

storiesOf("Apps/Order Page/Status", module)
  .add("submitted (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...OrderWithShippingDetails,
        state: "SUBMITTED",
      })}
    />
  ))
  .add("submitted (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...PickupOrder,
        state: "SUBMITTED",
      })}
    />
  ))
  .add("approved (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...OrderWithShippingDetails,
        state: "APPROVED",
      })}
    />
  ))
  .add("approved (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({ ...PickupOrder, state: "APPROVED" })}
    />
  ))
  .add("fulfilled (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...OrderWithShippingDetails,
        state: "FULFILLED",
      })}
    />
  ))
  .add("fulfilled (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({ ...PickupOrder, state: "FULFILLED" })}
    />
  ))
  .add("canceled (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...OrderWithShippingDetails,
        state: "CANCELED",
      })}
    />
  ))
  .add("canceled (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({ ...PickupOrder, state: "CANCELED" })}
    />
  ))

storiesOf("Apps/Order Page/Payment", module)
  .add("With 'Ship'", () => <Router initialRoute="/orders/123/payment" />)
  .add("With 'Pickup'", () => (
    <Router
      initialRoute="/orders/123/payment"
      mockResolvers={mockResolver(PickupOrder)}
    />
  ))
