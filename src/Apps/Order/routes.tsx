import {
  Location,
  Redirect,
  RedirectException,
  RouteConfig,
  Router,
} from "found"
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
import { ErrorPage } from "Components/ErrorPage"
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

const shouldRedirect = props => {
  const { location, order, params } = props as any

  if (
    order &&
    order.state !== "PENDING" &&
    !location.pathname.includes("status")
  ) {
    // Redirect to status page if the order is no longer PENDING (means it can't be edited anymore)
    throw new RedirectException(`/order2/${params.orderID}/status`)
  } else if (
    order &&
    !order.requestedFulfillment &&
    !location.pathname.includes("shipping")
  ) {
    // Redirect to shipping page if no shipping info has been set
    throw new RedirectException(`/order2/${params.orderID}/shipping`)
  } else if (
    order &&
    !order.creditCard &&
    !(
      location.pathname.includes("payment") ||
      location.pathname.includes("shipping")
    )
  ) {
    // Redirect to payment page if there is shipping but _no_ credit card
    throw new RedirectException(`/order2/${params.orderID}/payment`)
  } else {
    return false
  }
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
        order: ecommerceOrder(id: $orderID) {
          state
          requestedFulfillment {
            __typename
          }
          creditCard {
            id
          }
        }
      }
    `,
    render: ({ Component, props }) => {
      if (Component && props) {
        if (!shouldRedirect(props)) {
          return <Component {...props} />
        }
      }
    },
    children: [
      {
        path: "shipping",
        Component: ShippingRoute,
        onTransition: confirmRouteExit,
        query: graphql`
          query routes_ShippingQuery($orderID: String!) {
            order: ecommerceOrder(id: $orderID) {
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
            order: ecommerceOrder(id: $orderID) {
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
            order: ecommerceOrder(id: $orderID) {
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
            order: ecommerceOrder(id: $orderID) {
              ...Status_order
            }
          }
        `,
      },
      new Redirect({
        // For now, redirect the empty route to the shipping page
        from: "/",
        to: "/order2/:orderID/shipping",
      }) as any,
      {
        path: "*",
        Component: props => {
          return <ErrorPage code={404} />
        },
      },
    ],
  },
]
