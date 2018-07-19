import { graphql } from "react-relay"
import { OrderApp } from "./OrderApp"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"

export const routes = [
  {
    path: "/order2/:orderID",
    Component: OrderApp,
    query: graphql`
      query routes_OrderQuery {
        # order(id: $orderID) {
        #   id
        # }
        me {
          name
        }
      }
    `,
  },
]
