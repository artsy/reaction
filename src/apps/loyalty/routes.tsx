import * as React from "react"
import { render } from "react-dom"
import { IndexRoute, Route } from "react-router"
import * as auth from "./auth"

import App from "./app"
import Inquiries from "./containers/inquiries"
import Login from "./containers/login"

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: "/login",
      state: { nextPathname: nextState.location.pathname },
    })
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Inquiries} onEnter={requireAuth} />
    <Route path="login" component={Login} />
    <Route path="inquiries" component={Inquiries} onEnter={requireAuth} />
  </Route>
)
