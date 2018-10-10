import { confirmRouteExit, shouldRedirect } from "Apps/Order/redirects"
import { Redirect, RouteConfig } from "found"
import * as React from "react"
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

const ShippingRouteWrapper = props => (
  <ContextConsumer>
    {({ mediator }) => <ShippingRoute {...props} mediator={mediator} />}
  </ContextConsumer>
)

const PaymentRouteWrapper = props => (
  <ContextConsumer>
    {({ mediator }) => <PaymentRoute {...props} mediator={mediator} />}
  </ContextConsumer>
)

const ReviewRouteWrapper = props => (
  <ContextConsumer>
    {({ mediator }) => <ReviewRoute {...props} mediator={mediator} />}
  </ContextConsumer>
)

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
        Component: ShippingRouteWrapper,
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
        Component: PaymentRouteWrapper,
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
        path: "review",
        Component: ReviewRouteWrapper,
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
