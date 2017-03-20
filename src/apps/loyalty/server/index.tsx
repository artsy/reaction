import * as express from "express"
import * as path from "path"
import * as React from "react"
import { renderToString } from "react-dom/server"
import * as styleSheet from "styled-components/lib/models/StyleSheet"
import routes from "../routes"
import renderPage from "./template"

import Inquiries from "../containers/inquiries"
import Login from "../containers/login"

const app = express()

app.use(express.static(path.resolve(__dirname)))

app.get("/", (req, res) => {
  // check if the user is logged in, if not redirect to /login
  // else render /inquiries
  res.redirect(req.baseUrl + "/inquiries")
})

app.get("/login", (req, res) => {
  const html = renderToString(<Login />)
  const styles = styleSheet.rules().map(rule => rule.cssText).join("\n")
  res.send(renderPage({
    styles,
    html,
    entrypoint: "/bundles/login.js",
  }))
})

app.get("/inquiries", (req, res) => {
  const user = (req as any).user
  if (!user || user && !user.isLoggedIn()) {
    res.redirect(req.baseUrl + "/login")
  }

  const html = renderToString(<Inquiries />)
  const styles = styleSheet.rules().map(rule => rule.cssText).join("\n")
  res.send(renderPage({
    styles,
    html,
    entrypoint: "/bundles/inquiries.js",
  }))
})

export default app
