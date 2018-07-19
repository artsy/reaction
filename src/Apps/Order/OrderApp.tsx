import React, { SFC } from "react"

export interface OrderAppProps {
  me: {
    name: string
  }
}

// @ts-ignore
export const OrderApp: SFC<OrderAppProps> = ({ me }) => <div>{me.name}</div>
