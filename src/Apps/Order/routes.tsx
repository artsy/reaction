import { getRedirect } from "Apps/Order/getRedirect"
import { redirects } from "Apps/Order/redirects"
import { ErrorPage } from "Components/ErrorPage"
import { Redirect, RedirectException, RouteConfig } from "found"
import * as React from "react"
import { graphql } from "react-relay"

// import loadable from "@loadable/component"

import OrderApp from "./OrderApp"

import AcceptRoute from "./Routes/Accept"
import CounterRoute from "./Routes/Counter"
import NewPaymentRoute from "./Routes/NewPayment"
import OfferRoute from "./Routes/Offer"
import PaymentRoute from "./Routes/Payment"
import RejectRoute from "./Routes/Reject"
import RespondRoute from "./Routes/Respond"
import ReviewRoute from "./Routes/Review"
import ShippingRoute from "./Routes/Shipping"
import StatusRoute from "./Routes/Status"

// FIXME:
// * `render` functions requires casting
export const routes: RouteConfig[] = [
  {
    path: "/order(2|s)/:orderID",
    // getComponent: () => loadable(() => import("./OrderApp")),
    Component: OrderApp,

    // TODO: Better support `@principalField` in Metaphysics.
    // This currently only works because of the `order` field alias.
    query: graphql`
      query routes_OrderQuery($orderID: ID!) @raw_response_type {
        me {
          name
        }
        order: commerceOrder(id: $orderID) @principalField {
          ...redirects_order @relay(mask: false)
          ...OrderApp_order @relay(mask: false)
        }
      }
    `,
    render: ({ Component, props, resolving }) => {
      if (!(Component && props)) {
        // Returning `null` will show the spinner; but undefined uses purple
        // loader. Its a weird quirk :/
        return undefined // null
      }
      // resolving is true only if this render results from a query initiated by
      // found-relay
      if (resolving) {
        const { match, order } = props as any

        if (order) {
          const redirect = getRedirect(
            redirects,
            match.location.pathname.replace(/order(2|s)\/[^\/]+/, ""),
            { order }
          )
          if (redirect !== null) {
            if (process.env.NODE_ENV === "development") {
              console.error(
                `Redirecting from ${match.location.pathname} to ${redirect.path} because '${redirect.reason}'`
              )
            }
            throw new RedirectException(redirect.path)
          }
        }
      }

      return <Component {...props} />
    },
    children: [
      {
        path: "respond",
        // getComponent: () => loadable(() => import("./Routes/Respond")),
        Component: RespondRoute,
        shouldWarnBeforeLeaving: true,
        query: graphql`
          query routes_RespondQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Respond_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "offer",
        // getComponent: () => loadable(() => import("./Routes/Offer")),
        Component: OfferRoute,
        shouldWarnBeforeLeaving: true,
        query: graphql`
          query routes_OfferQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Offer_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "shipping",
        // getComponent: () => loadable(() => import("./Routes/Shipping")),
        Component: ShippingRoute,
        shouldWarnBeforeLeaving: true,
        query: graphql`
          query routes_ShippingQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Shipping_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "payment",
        // getComponent: () => loadable(() => import("./Routes/Payment")),
        Component: PaymentRoute,
        shouldWarnBeforeLeaving: true,
        query: graphql`
          query routes_PaymentQuery($orderID: ID!) {
            me {
              ...Payment_me
            }
            order: commerceOrder(id: $orderID) {
              ...Payment_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "payment/new",
        // getComponent: () => loadable(() => import("./Routes/NewPayment")),
        Component: NewPaymentRoute,
        shouldWarnBeforeLeaving: true,
        query: graphql`
          query routes_NewPaymentQuery($orderID: ID!) {
            me {
              ...NewPayment_me
            }
            order: commerceOrder(id: $orderID) {
              ...NewPayment_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "review/counter",
        // getComponent: () => loadable(() => import("./Routes/Counter")),
        Component: CounterRoute,
        shouldWarnBeforeLeaving: true,
        query: graphql`
          query routes_CounterQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Counter_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "review",
        // getComponent: () => loadable(() => import("./Routes/Review")),
        Component: ReviewRoute,
        shouldWarnBeforeLeaving: true,
        query: graphql`
          query routes_ReviewQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Review_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "review/accept",
        // getComponent: () => loadable(() => import("./Routes/Accept")),
        Component: AcceptRoute,
        query: graphql`
          query routes_AcceptQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Accept_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "review/decline",
        // getComponent: () => loadable(() => import("./Routes/Reject")),
        Component: RejectRoute,
        query: graphql`
          query routes_RejectQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Reject_order
            }
          }
        `,
      },
      {
        path: "status",
        // getComponent: () => loadable(() => import("./Routes/Status")),
        Component: StatusRoute,
        query: graphql`
          query routes_StatusQuery($orderID: ID!) {
            order: commerceOrder(id: $orderID) {
              ...Status_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      new Redirect({
        // For now, redirect the empty route to the shipping page
        from: "/",
        to: "/orders/:orderID/shipping",
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
