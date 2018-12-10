import { confirmRouteExit, shouldRedirect } from "Apps/Order/redirects"
import { Redirect, RouteConfig } from "found"
import * as React from "react"
import { graphql } from "react-relay"
import { OrderApp } from "./OrderApp"

import { AcceptFragmentContainer as AcceptRoute } from "Apps/Order/Routes/Accept"
import { OfferFragmentContainer as OfferRoute } from "Apps/Order/Routes/Offer"
import { PaymentFragmentContainer as PaymentRoute } from "Apps/Order/Routes/Payment"
import { RespondFragmentContainer as RespondRoute } from "Apps/Order/Routes/Respond"
import { ReviewFragmentContainer as ReviewRoute } from "Apps/Order/Routes/Review"
import { ShippingFragmentContainer as ShippingRoute } from "Apps/Order/Routes/Shipping"
import { StatusFragmentContainer as StatusRoute } from "Apps/Order/Routes/Status"
import { CounterFragmentContainer as CounterRoute } from "./Routes/Counter"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"

// @ts-ignore
import { ContextConsumer } from "Artsy"
import { ErrorPage } from "Components/ErrorPage"
// @ts-ignore
import { PaymentProps } from "./Routes/Payment"
// @ts-ignore
import { ReviewProps } from "./Routes/Review"
// @ts-ignore
import { ShippingProps } from "./Routes/Shipping"
// @ts-ignore
import { StatusProps } from "./Routes/Status"

// FIXME:
// * `render` functions requires casting
export const routes: RouteConfig[] = [
  {
    path: "/order(2|s)/:orderID",
    Component: OrderApp,
    query: graphql`
      query routes_OrderQuery($orderID: String!) {
        me {
          name
        }
        order: ecommerceOrder(id: $orderID) {
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
          ... on OfferOrder {
            awaitingResponseFrom
          }
        }
      }
    `,
    render: ({ Component, props }) => {
      if (Component && props) {
        if (!shouldRedirect(props as any)) {
          return <Component {...props} />
        }
      }
    },
    children: [
      {
        path: "respond",
        Component: RespondRoute,
        onTransition: confirmRouteExit,
        query: graphql`
          query routes_RespondQuery($orderID: String!) {
            order: ecommerceOrder(id: $orderID) {
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
        Component: OfferRoute,
        onTransition: confirmRouteExit,
        query: graphql`
          query routes_OfferQuery($orderID: String!) {
            order: ecommerceOrder(id: $orderID) {
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
        Component: ShippingRoute,
        onTransition: confirmRouteExit,
        query: graphql`
          query routes_ShippingQuery($orderID: String!) {
            order: ecommerceOrder(id: $orderID) {
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
        Component: PaymentRoute,
        onTransition: confirmRouteExit,
        query: graphql`
          query routes_PaymentQuery($orderID: String!) {
            order: ecommerceOrder(id: $orderID) {
              ...Payment_order
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "review/counter",
        Component: CounterRoute,
        onTransition: confirmRouteExit,
        query: graphql`
          query routes_CounterQuery($orderID: String!) {
            order: ecommerceOrder(id: $orderID) {
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
        Component: ReviewRoute,
        onTransition: confirmRouteExit,
        query: graphql`
          query routes_ReviewQuery($orderID: String!) {
            order: ecommerceOrder(id: $orderID) {
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
        Component: AcceptRoute,
        query: graphql`
          query routes_AcceptQuery($orderID: String!) {
            order: ecommerceOrder(id: $orderID) {
              ...Accept_order
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
