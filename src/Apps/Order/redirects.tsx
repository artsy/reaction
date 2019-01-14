import { routes_OrderQueryResponse } from "__generated__/routes_OrderQuery.graphql"
import { Location, RouteConfig, Router } from "found"
import moment from "moment"
import { graphql } from "react-relay"
import { get } from "Utils/get"
import { RedirectPredicate, RedirectRecord } from "./getRedirect"
import { OrderApp } from "./OrderApp"

import { redirects_order } from "__generated__/redirects_order.graphql"

const LEAVE_MESSAGING =
  "Are you sure you want to refresh? Your changes will not be saved."

interface OrderQuery {
  order: redirects_order
}

type OrderPredicate = RedirectPredicate<OrderQuery>

export const confirmRouteExit = (
  newLocation: Location,
  oldLocation: Location,
  router: Router
) => {
  // Refresh -- On refresh newLocation is null
  if (!newLocation || newLocation.pathname === oldLocation.pathname) {
    // Most browsers will ignore this and supply their own messaging for refresh
    return LEAVE_MESSAGING
  }

  // Attempting to navigate to another route in the orders app
  const match = router.matcher.match(newLocation)
  if (match) {
    const matchedRoutes: RouteConfig[] | null = router.matcher.getRoutes(match)
    if (matchedRoutes && matchedRoutes[0].Component === OrderApp) {
      return undefined
    }
  }

  return LEAVE_MESSAGING
}

const goToStatusIf = (
  pred: (order: routes_OrderQueryResponse["order"]) => boolean,
  reason
): OrderPredicate => ({ order }) => {
  if (pred(order)) {
    return {
      path: `/orders/${order.id}/status`,
      reason,
    }
  }
}

const goToArtworkIfOrderWasAbandoned: OrderPredicate = ({ order }) => {
  if (order.state === "ABANDONED") {
    const artworkID = get(order, o => o.lineItems.edges[0].node.artwork.id)
    // If an artwork ID can't be found, redirect back to home page.
    return {
      path: artworkID ? `/artwork/${artworkID}` : "/",
      reason: "Order was abandoned",
    }
  }
}

const goToStatusIfOrderIsNotPending = goToStatusIf(
  order => order.state !== "PENDING",
  "Order is no longer pending"
)

const goToShippingIfShippingIsNotCompleted: OrderPredicate = ({ order }) => {
  if (!order.requestedFulfillment) {
    return {
      path: `/orders/${order.id}/shipping`,
      reason: "Shipping was not yet completed",
    }
  }
}

const goToPaymentIfPaymentIsNotCompleted: OrderPredicate = ({ order }) => {
  if (!order.creditCard) {
    return {
      path: `/orders/${order.id}/payment`,
      reason: "Payment was not yet completed",
    }
  }
}

const goToShippingIfOrderIsNotOfferOrder: OrderPredicate = ({ order }) => {
  if (order.mode !== "OFFER") {
    return {
      path: `/orders/${order.id}/shipping`,
      reason: "Order is not an offer order",
    }
  }
}

const goToOfferIfNoOfferMade: OrderPredicate = ({ order }) => {
  if (order.mode === "OFFER" && !order.myLastOffer) {
    return {
      path: `/orders/${order.id}/offer`,
      reason: "No offer has been made yet",
    }
  }
}

const goToStatusIfNotOfferOrder = goToStatusIf(
  order => order.mode !== "OFFER",
  "Not an offer order"
)

const goToStatusIfNotAwaitingBuyerResponse = goToStatusIf(
  order => order.awaitingResponseFrom !== "BUYER",
  "Not currently awaiting buyer response"
)

const goToStatusIfOrderIsNotSubmitted = goToStatusIf(
  order => order.state !== "SUBMITTED",
  "Order was not yet submitted"
)

const goToReviewIfOrderIsPending: OrderPredicate = ({ order }) => {
  if (order.state === "PENDING") {
    return {
      path: `/orders/${order.id}/review`,
      reason: "Order is still pending",
    }
  }
}

const goToRespondIfMyLastOfferIsNotMostRecentOffer: OrderPredicate = ({
  order,
}) => {
  if (
    order.myLastOffer &&
    order.lastOffer &&
    moment(order.myLastOffer.createdAt).isAfter(order.lastOffer.createdAt)
  ) {
    return
  }
  return {
    path: `/orders/${order.id}/respond`,
    reason: "myLastOffer is not most recent offer",
  }
}

const goToRespondIfAwaitingBuyerResponse: OrderPredicate = ({ order }) => {
  if (order.awaitingResponseFrom === "BUYER") {
    return {
      path: `/orders/${order.id}/respond`,
      reason: "Still awaiting buyer response",
    }
  }
}

export const redirects: RedirectRecord<OrderQuery> = {
  path: "",
  rules: [goToArtworkIfOrderWasAbandoned],
  children: [
    {
      path: "respond",
      rules: [
        goToStatusIfNotOfferOrder,
        goToStatusIfNotAwaitingBuyerResponse,
        goToStatusIfOrderIsNotSubmitted,
      ],
    },
    {
      path: "offer",
      rules: [
        goToStatusIfOrderIsNotPending,
        goToShippingIfOrderIsNotOfferOrder,
      ],
    },
    {
      path: "shipping",
      rules: [goToStatusIfOrderIsNotPending, goToOfferIfNoOfferMade],
    },
    {
      path: "payment",
      rules: [
        goToStatusIfOrderIsNotPending,
        goToShippingIfShippingIsNotCompleted,
      ],
    },
    {
      path: "review",
      rules: [
        goToStatusIfOrderIsNotPending,
        goToShippingIfShippingIsNotCompleted,
        goToPaymentIfPaymentIsNotCompleted,
      ],
    },
    {
      path: "review/counter",
      rules: [
        goToStatusIfNotOfferOrder,
        goToStatusIfNotAwaitingBuyerResponse,
        goToStatusIfOrderIsNotSubmitted,
        goToRespondIfMyLastOfferIsNotMostRecentOffer,
      ],
    },
    {
      path: "review/accept",
      rules: [
        goToStatusIfNotOfferOrder,
        goToStatusIfNotAwaitingBuyerResponse,
        goToStatusIfOrderIsNotSubmitted,
      ],
    },
    {
      path: "review/decline",
      rules: [
        goToStatusIfNotOfferOrder,
        goToStatusIfNotAwaitingBuyerResponse,
        goToStatusIfOrderIsNotSubmitted,
      ],
    },
    {
      path: "status",
      rules: [
        goToReviewIfOrderIsPending,
        goToShippingIfShippingIsNotCompleted,
        goToPaymentIfPaymentIsNotCompleted,
        goToRespondIfAwaitingBuyerResponse,
      ],
    },
  ],
}

graphql`
  fragment redirects_order on Order {
    id
    mode
    state
    ... on OfferOrder {
      myLastOffer {
        id
        createdAt
      }
      lastOffer {
        id
        createdAt
      }
      awaitingResponseFrom
    }
    requestedFulfillment {
      __typename
    }
    lineItems {
      edges {
        node {
          artwork {
            id
          }
        }
      }
    }
    creditCard {
      id
    }
  }
`
