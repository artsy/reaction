import { routes_OrderQueryResponse } from "__generated__/routes_OrderQuery.graphql"
import { Location, RedirectException, RouteConfig, Router } from "found"
import { get } from "Utils/get"
import { OrderApp } from "./OrderApp"

const LEAVE_MESSAGING =
  "Are you sure you want to refresh? Your changes will not be saved."

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

export const shouldRedirect = ({
  location,
  order,
  params,
}: {
  // note: these types were originally based on what this function was using
  // rather than what it was being given. Feel free to extend if it needs
  // to use more things.
  location: Location
  order: routes_OrderQueryResponse["order"]
  params: { orderID: string }
}) => {
  if (!order) {
    // error
    return false
  }

  if (order.state === "ABANDONED") {
    const artworkID = get(order, o => o.lineItems.edges[0].node.artwork.id)
    // If an artwork ID can't be found, redirect back to home page.
    throw new RedirectException(artworkID ? `/artwork/${artworkID}` : "/")
  }

  if (
    order.state !== "PENDING" &&
    !location.pathname.includes("status") &&
    order.mode !== "OFFER"
  ) {
    // Redirect to status page if the order is no longer PENDING (means it can't be edited anymore)
    throw new RedirectException(`/orders/${params.orderID}/status`)
  }

  if (
    location.pathname.includes("respond") &&
    order.awaitingResponseFrom !== "BUYER"
  ) {
    // redirect to status page if there is nothing to respond to
    throw new RedirectException(`/orders/${params.orderID}/status`)
  }

  if (location.pathname.includes("offer")) {
    if (order.state !== "PENDING") {
      throw new RedirectException(`/orders/${params.orderID}/status`)
    } else if (order.mode !== "OFFER") {
      throw new RedirectException(`/orders/${params.orderID}/shipping`)
    }
  }

  if (!order.requestedFulfillment && !location.pathname.includes("shipping")) {
    // Redirect to shipping page if no shipping info has been set
    throw new RedirectException(`/orders/${params.orderID}/shipping`)
  }

  if (
    !order.creditCard &&
    !(
      location.pathname.includes("payment") ||
      location.pathname.includes("shipping")
    )
  ) {
    // Redirect to payment page if there is shipping but _no_ credit card
    throw new RedirectException(`/orders/${params.orderID}/payment`)
  }

  return false
}
