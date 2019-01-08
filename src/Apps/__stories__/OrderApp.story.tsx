import {
  Buyer,
  BuyOrderPickup,
  BuyOrderWithShippingDetails,
  mockResolver,
  OfferOrderPickup,
  OfferOrderWithShippingDetails,
  Offers,
  OfferWithTotals,
  UntouchedBuyOrder,
  UntouchedOfferOrder,
} from "Apps/__tests__/Fixtures/Order"
import { MockRouter } from "DevTools/MockRouter"
import moment from "moment"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as orderRoutes } from "../Order/routes"

const Router = props => (
  <MockRouter
    routes={orderRoutes}
    mockResolvers={mockResolver()}
    historyOptions={{ useBeforeUnload: true }}
    context={{
      mediator: {
        trigger: x => x,
      },
    }}
    {...props}
  />
)

storiesOf("Apps/Order Page/Buy Now/Shipping", module)
  .add("Shipping - Pre-filled", () => (
    <Router initialRoute="/orders/123/shipping" />
  ))
  .add("Shipping - Untouched Order", () => (
    <Router
      // The UntouchedBuyOrder has a specified requestedFulfillment, but it should be null.
      // Unfortunately, enough of our tests use UntouchedBuyOrder to change it, so we'll specify it here to avoid breaking our story.
      mockResolvers={mockResolver({
        ...UntouchedBuyOrder,
        requestedFulfillment: null,
      })}
      initialRoute="/orders/123/shipping"
    />
  ))

storiesOf("Apps/Order Page/Buy Now/Review", module).add("Review", () => (
  <Router initialRoute="/orders/123/review" />
))

storiesOf("Apps/Order Page/Buy Now/Payment", module)
  .add("With 'Ship'", () => <Router initialRoute="/orders/123/payment" />)
  .add("With 'Pickup'", () => (
    <Router
      initialRoute="/orders/123/payment"
      mockResolvers={mockResolver(BuyOrderPickup)}
    />
  ))

storiesOf("Apps/Order Page/Buy Now/Status", module)
  .add("submitted (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...BuyOrderWithShippingDetails,
        state: "SUBMITTED",
      })}
    />
  ))
  .add("submitted (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...BuyOrderPickup,
        state: "SUBMITTED",
      })}
    />
  ))
  .add("approved (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...BuyOrderWithShippingDetails,
        state: "APPROVED",
      })}
    />
  ))
  .add("approved (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({ ...BuyOrderPickup, state: "APPROVED" })}
    />
  ))
  .add("fulfilled (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...BuyOrderWithShippingDetails,
        state: "FULFILLED",
      })}
    />
  ))
  .add("fulfilled (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({ ...BuyOrderPickup, state: "FULFILLED" })}
    />
  ))
  .add("canceled (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...BuyOrderWithShippingDetails,
        state: "CANCELED",
      })}
    />
  ))
  .add("canceled (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({ ...BuyOrderPickup, state: "CANCELED" })}
    />
  ))
  .add("refunded", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({ ...BuyOrderPickup, state: "REFUNDED" })}
    />
  ))

storiesOf("Apps/Order Page/Make Offer/Offer", module).add("Empty", () => (
  <Router
    initialRoute="/orders/123/offer"
    mockResolvers={mockResolver({
      ...UntouchedOfferOrder,
      requestedFulfillment: null,
    })}
  />
))

storiesOf("Apps/Order Page/Make Offer/Shipping", module)
  .add("Shipping - Pre-filled", () => (
    <Router
      initialRoute="/orders/123/shipping"
      mockResolvers={mockResolver(OfferOrderWithShippingDetails)}
    />
  ))
  .add("Shipping - Untouched Order", () => (
    <Router
      // The UntouchedBuyOrder has a specified requestedFulfillment, but it should be null.
      // Unfortunately, enough of our tests use UntouchedBuyOrder to change it, so we'll specify it here to avoid breaking our story.
      mockResolvers={mockResolver({
        ...UntouchedOfferOrder,
        requestedFulfillment: null,
      })}
      initialRoute="/orders/123/shipping"
    />
  ))

storiesOf("Apps/Order Page/Make Offer/Payment", module)
  .add("With 'Ship'", () => (
    <Router
      initialRoute="/orders/123/payment"
      mockResolvers={mockResolver(OfferOrderWithShippingDetails)}
    />
  ))
  .add("With 'Pickup'", () => (
    <Router
      initialRoute="/orders/123/payment"
      mockResolvers={mockResolver(OfferOrderPickup)}
    />
  ))

storiesOf("Apps/Order Page/Make Offer/Review", module).add("Review", () => (
  <Router
    initialRoute="/orders/123/review"
    mockResolvers={mockResolver(OfferOrderWithShippingDetails)}
  />
))

storiesOf("Apps/Order Page/Respond", module)
  .add("Respond", () => (
    <Router
      initialRoute="/orders/123/respond"
      mockResolvers={mockResolver({
        ...OfferOrderWithShippingDetails,
        state: "SUBMITTED",
        stateExpiresAt: moment()
          .add(1, "day")
          .toISOString(),
        lastOffer: {
          ...OfferWithTotals,
          createdAt: moment()
            .subtract(1, "day")
            .toISOString(),
        },
        awaitingResponseFrom: "BUYER",
        offers: { edges: Offers },
        buyer: Buyer,
      })}
    />
  ))
  .add("Review (counter)", () => (
    <Router
      initialRoute="/orders/123/review/counter"
      mockResolvers={mockResolver({
        ...OfferOrderWithShippingDetails,
        state: "SUBMITTED",
        stateExpiresAt: moment()
          .add(1, "day")
          .toISOString(),
        lastOffer: {
          ...OfferWithTotals,
          id: "last-offer",
          createdAt: moment()
            .subtract(1, "day")
            .toISOString(),
        },
        myLastOffer: {
          ...OfferWithTotals,
          id: "my-last-offer",
          fromParticipant: "BUYER",
          createdAt: moment()
            .subtract(1, "minute")
            .toISOString(),
        },
        awaitingResponseFrom: "BUYER",
        offers: { edges: Offers },
        buyer: Buyer,
      })}
    />
  ))
  .add("Review (accept)", () => (
    <Router
      initialRoute="/orders/123/review/accept"
      mockResolvers={mockResolver({
        ...OfferOrderWithShippingDetails,
        state: "SUBMITTED",
        stateExpiresAt: moment()
          .add(1, "day")
          .toISOString(),
        lastOffer: {
          ...OfferWithTotals,
          id: "last-offer",
          createdAt: moment()
            .subtract(1, "day")
            .toISOString(),
        },
        awaitingResponseFrom: "BUYER",
        offers: { edges: Offers },
        buyer: Buyer,
      })}
    />
  ))
  .add("Review (reject)", () => (
    // Steve was going to look into sharing these stubbed data sets, check with him before merging.
    <Router
      initialRoute="/orders/123/review/decline"
      mockResolvers={mockResolver({
        ...OfferOrderWithShippingDetails,
        state: "SUBMITTED",
        stateExpiresAt: moment()
          .add(1, "day")
          .toISOString(),
        lastOffer: {
          ...OfferWithTotals,
          id: "last-offer",
          createdAt: moment()
            .subtract(1, "day")
            .toISOString(),
        },
        awaitingResponseFrom: "BUYER",
        offers: { edges: Offers },
        buyer: Buyer,
      })}
    />
  ))

storiesOf("Apps/Order Page/Make Offer/Status", module)
  .add("submitted (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...OfferOrderWithShippingDetails,
        state: "SUBMITTED",
      })}
    />
  ))
  .add("submitted (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...OfferOrderPickup,
        state: "SUBMITTED",
      })}
    />
  ))
  .add("approved (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...OfferOrderWithShippingDetails,
        state: "APPROVED",
      })}
    />
  ))
  .add("approved (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...OfferOrderPickup,
        state: "APPROVED",
      })}
    />
  ))
  .add("fulfilled (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...OfferOrderWithShippingDetails,
        state: "FULFILLED",
      })}
    />
  ))
  .add("fulfilled (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...OfferOrderPickup,
        state: "FULFILLED",
      })}
    />
  ))
  .add("buyer rejected", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...OfferOrderWithShippingDetails,
        stateReason: "buyer_rejected",
        state: "CANCELED",
      })}
    />
  ))
  .add("seller rejected", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...OfferOrderWithShippingDetails,
        stateReason: "seller_rejected",
        state: "CANCELED",
      })}
    />
  ))
  .add("buyer lapsed", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...OfferOrderWithShippingDetails,
        stateReason: "buyer_lapsed",
        state: "CANCELED",
      })}
    />
  ))
  .add("seller lapsed", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...OfferOrderWithShippingDetails,
        stateReason: "seller_lapsed",
        state: "CANCELED",
      })}
    />
  ))
  .add("refunded", () => (
    <Router
      initialRoute="/orders/123/status"
      mockResolvers={mockResolver({
        ...OfferOrderWithShippingDetails,
        state: "REFUNDED",
      })}
    />
  ))
