import * as bodyParser from "body-parser"
import * as cookieParser from "cookie-parser"
import * as csurf from "csurf"
import * as express from "express"
import * as session from "express-session"
import { default as IsomorphicRelay } from "isomorphic-relay"
import * as path from "path"
import * as React from "react"
import * as Relay from "react-relay"
import * as request from "request"

import { renderToString } from "react-dom/server"
import * as styleSheet from "styled-components/lib/models/StyleSheet"
import renderPage from "./template"

import CurrentUserRoute from "../../../relay/queries/current_user"
import ThreewThankYou from "../containers/3w_thank_you"
import AcbThankYou from "../containers/acb_thank_you"
import Inquiries from "../containers/inquiries"
import Login from "../containers/login"
import CurrentUser from "./current_user"
import { RelayMiddleware } from "./relay"

const app = express()
const artsyPassport = require("artsy-passport")
const sharify = require("sharify")

app.use(express.static(path.resolve(__dirname)))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(sharify)
app.use(cookieParser())
app.use(session({
  secret: process.env.ARTSY_SECRET,
  cookie: {
    maxAge: 60000,
  },
}))
app.use(artsyPassport(Object.assign({}, process.env, {
  CurrentUser,
  loginPagePath: "/login",
})))
app.use(RelayMiddleware)

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
    url: `${req.baseUrl + req.path}?redirect-to=${req.baseUrl}`,
    csrfToken: req.csrfToken(),
    facebookPath,
    twitterPath,
  }
  const html = renderToString(<Login form={formConfig} />)
  const styles = styleSheet.rules().map(rule => rule.cssText).join("\n")

  res.locals.sharify.data.FORM_DATA = formConfig

  res.send(renderPage({
    styles,
    html,
    entrypoint: "/bundles/login.js",
    sharify: res.locals.sharify.script(),
  }))
})

app.get("/inquiries", (req, res) => {
  if (!req.user) {
    return res.redirect(req.baseUrl + "/login")
  }

  let promise = IsomorphicRelay.prepareData({
    Container: Inquiries,
    queryConfig: new CurrentUserRoute(),
  }, res.locals.networkLayer)

  promise
    .then(({data, props}) => {
      const html = renderToString(<IsomorphicRelay.Renderer {...props} />)
      const styles = styleSheet.rules().map(rule => rule.cssText).join("\n")

      res.locals.sharify.data.USER_DATA = req.user.toJSON()
      res.locals.sharify.data.DATA = data

      res.send(renderPage({
        styles,
        html,
        entrypoint: "/bundles/inquiries.js",
        sharify: res.locals.sharify.script(),
      }))
    })
})

app.get("/thank-you", (req, res) => {
  if (!req.user) {
    return res.redirect(req.baseUrl + "/login")
  }

  request({
    url: `${process.env.ARTSY_URL}/api/v1/me/collector_profile`,
    headers: {
      "X-Access-Token": req.user.get("accessToken"),
    },
  }, (err, resp, body) => {
    if (!err && resp.statusCode === 200) {
      const info = JSON.parse(body)
      let html

      if (!info.loyalty_applicant_at) {
        if (!info.confirmed_buyer_at) {
          html = renderToString(<ThreewThankYou userName={req.user.attributes.name} />)
        } else {
          html = renderToString(<AcbThankYou />)
        }
      } else {
        return res.redirect(req.baseUrl) // baseUrl already has "/loyalty" so no need to append it.
      }

      const styles = styleSheet.rules().map(rule => rule.cssText).join("\n")
      res.send(renderPage({ styles, html, entrypoint: "" }))
    }
  })
})

export default app
