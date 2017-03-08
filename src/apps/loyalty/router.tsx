import * as React from "react"
import { render } from "react-dom"
import { browserHistory, IndexRoute, Link, Route, Router } from "react-router"
import * as auth from "./auth"

import Inquiries from "../../containers/inquiries"
import Login from "../../containers/login"
import App from "./app"

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: "/login",
      state: { nextPathname: nextState.location.pathname },
    })
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Inquiries} onEnter={requireAuth} />
      <Route path="login" component={Login} />
      <Route path="inquiries" component={Inquiries} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById("app-container"))
