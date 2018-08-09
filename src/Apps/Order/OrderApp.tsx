import React, { SFC } from "react"

export interface OrderAppProps {
  me: {
    name: string
  }
  params: {
    orderID: string
  }
  location: any
}

export const OrderApp: SFC<OrderAppProps> = ({
  me,
  children,
  location,
  ...props
}) => {
  return <>{children}</>
}
