import React, { Component } from "react"
import { App } from "./App"
import { BrowserRouter } from "react-router-dom"
import { StaticRouter } from "react-router"

export class OrderForm extends Component {
  render() {
    const isClient = typeof window !== "undefined"
    const Router = isClient ? BrowserRouter : StaticRouter
    const basename = isClient && "/order2"

    return (
      <Router basename={basename}>
        <App />
      </Router>
    )
  }
}
