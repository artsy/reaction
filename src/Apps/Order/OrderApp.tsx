import React, { SFC } from "react"

export interface OrderAppProps {
  orderID: string
  me: {
    name: string
  }
}

// @ts-ignore
export const OrderApp: SFC<OrderAppProps> = ({ orderID, me }) => (
  <div>
    {me.name}
    {orderID}
  </div>
)
