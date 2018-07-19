import { graphql } from "react-relay"
import { OrderApp } from "./OrderApp"

// @ts-ignore
import { ShippingFragmentContainer as ShippingRoute } from "Apps/Order/Routes/Shipping"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"

// @ts-ignore
import { ShippingProps } from "./Routes/Shipping"

export const routes = [
  {
    path: "/order2/:orderID",
    Component: OrderApp,
    query: graphql`
      query routes_OrderQuery {
        me {
          name
        }
      }
    `,
    children: [
      {
        path: "shipping",
        Component: ShippingRoute,
        query: graphql`
          query routes_ShippingQuery($orderID: String!) {
            order(id: $orderID) {
              ...Shipping_order
            }
          }
        `,
      },
    ],
  },
]
