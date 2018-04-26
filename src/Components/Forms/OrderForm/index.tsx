import React, { SFC } from "react"
import { App } from "./App"
// import { BrowserRouter } from "react-router-dom"
// import { StaticRouter } from "react-router"

export const OrderForm: SFC<{ onSubmit: any }> = ({ onSubmit }) => {
  // const isClient = typeof window !== "undefined"
  // const Router = isClient ? BrowserRouter : StaticRouter // TODO: Swap BrowserRouter with MemoryRouter to hide URLBar state
  // const basename = isClient && "/order2"

  // return (
  //   <Router basename={basename}>
  //     <App />
  //   </Router>
  // )
  return <App onSubmit={onSubmit} />
}
