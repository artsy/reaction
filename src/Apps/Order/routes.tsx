import { Location, Redirect, RouteConfig, Router } from "found"
import React from "react"
import { graphql } from "react-relay"
import { OrderApp } from "./OrderApp"

// @ts-ignore
import { PaymentFragmentContainer as PaymentRoute } from "Apps/Order/Routes/Payment"
// @ts-ignore
import { ReviewFragmentContainer as ReviewRoute } from "Apps/Order/Routes/Review"
// @ts-ignore
import { ShippingFragmentContainer as ShippingRoute } from "Apps/Order/Routes/Shipping"
// @ts-ignore
import { StatusFragmentContainer as StatusRoute } from "Apps/Order/Routes/Status"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"

// @ts-ignore
import { PaymentProps } from "./Routes/Payment"
// @ts-ignore
import { ReviewProps } from "./Routes/Review"
// @ts-ignore
import { ShippingProps } from "./Routes/Shipping"
// @ts-ignore
import { StatusProps } from "./Routes/Status"

const LEAVE_MESSAGING =
  "Are you sure you want to refresh? Your changes will not be saved."

const confirmRouteExit = (
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
      return true
    }
  }

  return LEAVE_MESSAGING
}

// FIXME:
// * `render` functions requires casting
export const routes: RouteConfig[] = [
  {
    path: "/order2/:orderID",
    Component: OrderApp,
    query: graphql`
      query routes_OrderQuery($orderID: String!) {
        me {
          name
        }
        order(id: $orderID) {
          state
        }
      }
    `,
    children: [
      {
        path: "shipping",
        Component: ShippingRoute,
        onTransition: confirmRouteExit,
        query: graphql`
          query routes_ShippingQuery($orderID: String!) {
            order(id: $orderID) {
              ...Shipping_order
            }
          }
        `,
      },
      {
        path: "payment",
        Component: PaymentRoute,
        onTransition: confirmRouteExit,
        query: graphql`
          query routes_PaymentQuery($orderID: String!) {
            order(id: $orderID) {
              ...Payment_order
            }
          }
        `,
      },
      {
        path: "review",
        Component: ReviewRoute,
        onTransition: confirmRouteExit,
        query: graphql`
          query routes_ReviewQuery($orderID: String!) {
            order(id: $orderID) {
              ...Review_order
            }
          }
        `,
      },
      {
        path: "status",
        Component: StatusRoute,
        query: graphql`
          query routes_StatusQuery($orderID: String!) {
            order(id: $orderID) {
              ...Status_order
            }
          }
        `,
      },
      // For now, redirect the empty route to the shipping page
      new Redirect({
        from: "/",
        to: "/order2/:orderID/shipping",
      }) as any,
      {
        path: "*",
        Component: props => {
          console.warn("Route not found: ", props)
          return <div>Page not found</div>
        },
      },
    ],
  },
]
