import * as artsyPassport from "artsy-passport"
import * as Backbone from "backbone"
import * as express from "express"
import { default as IsomorphicRelay } from "isomorphic-relay"
import * as path from "path"
import * as React from "react"
import * as Relay from "react-relay"

import { renderToString } from "react-dom/server"
import * as styleSheet from "styled-components/lib/models/StyleSheet"
import renderPage from "./template"

import CurrentUserRoute from "../../../relay/queries/current_user"

import Inquiries from "../containers/inquiries"
import { markCollectorAsLoyaltyApplicant } from "./gravity"
import RelayMiddleware from "./middlewares/relay"
import UserMiddleware from "./middlewares/user"
import { Home, Login, ThankYou } from "./route_handlers"

const app = express.Router()

app.use(express.static(path.resolve(__dirname)))

const {
  loginPagePath,
} = artsyPassport.options

app.use(artsyPassport(Object.assign({
  CurrentUser: Backbone.Model,
}, process.env)))
app.use(RelayMiddleware)
app.use(UserMiddleware)

app.get("/", Home)
app.get(loginPagePath, Login)
app.get("/thank-you", ThankYou)

app.get("/inquiries", (req, res) => {
  if (!req.user) {
    return res.redirect(req.baseUrl + loginPagePath)
  }

  const info = req.user.get("profile")
  if (info.loyalty_applicant_at) {
    return res.redirect(req.baseUrl + "/thank-you")
  }

  if (info.confirmed_buyer_at) {
    markCollectorAsLoyaltyApplicant(req.user.get("accessToken"))
      .then(profile => {
        return res.redirect(req.baseUrl + "/thank-you")
      })
      .catch(err => console.error(err))
  }

  IsomorphicRelay.prepareData({
    Container: Inquiries,
    queryConfig: new CurrentUserRoute(),
  }, res.locals.networkLayer).then(
    ({data, props}) => {
      const html = renderToString(<IsomorphicRelay.Renderer {...props} />)
      const styles = styleSheet.rules().map(rule => rule.cssText).join("\n")
      res.locals.sharify.data.USER_DATA = req.user.toJSON()
      res.locals.sharify.data.DATA = data
      res.send(renderPage({
        styles,
        html,
        entrypoint: req.baseUrl + "/bundles/inquiries.js",
        sharify: res.locals.sharify.script(),
        baseURL: req.baseUrl,
      }))
    })
})

export default app
