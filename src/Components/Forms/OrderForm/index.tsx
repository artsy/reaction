import React, { SFC } from "react"
import { App } from "./App"

export const OrderForm: SFC<{ onSubmit: any }> = ({ onSubmit }) => {
  return <App onSubmit={onSubmit} />
}
