import * as bodyParser from "body-parser"
import * as cookieParser from "cookie-parser"
import * as csurf from "csurf"
import * as express from "express"
import * as session from "express-session"
import * as path from "path"
import * as React from "react"
import { renderToString } from "react-dom/server"
import * as styleSheet from "styled-components/lib/models/StyleSheet"
import renderPage from "./template"

import Inquiries from "../containers/inquiries"
import Login from "../containers/login"
import CurrentUser from "./current_user"

const app = express()
const artsyPassport = require("artsy-passport")

app.use(express.static(path.resolve(__dirname)))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
  secret: process.env.ARTSY_SECRET,
  cookie: {},
}))
app.use(artsyPassport(Object.assign({}, process.env, {
  CurrentUser,
  loginPagePath: "/login",
})))

const {
  loginPagePath,
  facebookPath,
  twitterPath,
} = artsyPassport.options

app.get("/", (req, res) => {
  res.redirect(req.baseUrl + "/inquiries")
})

app.get(loginPagePath, (req, res) => {
  const formConfig = {
    url: req.baseUrl + req.path,
    csrfToken: req.csrfToken(),
    facebookPath,
    twitterPath,
  }
  const html = renderToString(<Login form={formConfig} />)
  const styles = styleSheet.rules().map(rule => rule.cssText).join("\n")

  res.send(renderPage({
    styles,
    html,
    entrypoint: "/bundles/login.js",
  }))
})

app.get("/inquiries", (req, res) => {
  if (!req.user) {
    return res.redirect(req.baseUrl + "/login")
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
