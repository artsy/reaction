import * as artsyPassport from "artsy-passport"
import * as Backbone from "backbone"
import * as express from "express"
import * as path from "path"
import * as React from "react"
import * as Relay from "react-relay"

import RelayMiddleware from "./middlewares/relay"
import UserMiddleware from "./middlewares/user"
import { Home, Inquiries, Login, ThankYou } from "./route_handlers"

const app = express.Router()
const { API_URL } = process.env

app.use(express.static(path.resolve(__dirname)))

const {
  loginPagePath,
} = artsyPassport.options

app.use(artsyPassport(Object.assign({
  CurrentUser: Backbone.Model,
  ARTSY_URL: API_URL,
}, process.env)))

app.use(RelayMiddleware)
app.use(UserMiddleware)

app.get("/", Home)
app.get(loginPagePath, Login)
app.get("/thank-you", ThankYou)
app.get("/inquiries", Inquiries)

export default app
