import artsyPassport from "artsy-passport"
import Backbone from "backbone"
import express from "express"
import path from "path"

import RelayMiddleware from "./Middlewares/Relay"
import SetSessionIDMiddleware from "./Middlewares/TrackSession"
import UserMiddleware from "./Middlewares/User"
import { ForgotPassword, Home, Inquiries, Login, ThankYou } from "./RouteHandlers"

const app = express.Router()
const { API_URL } = process.env

app.use(express.static(path.resolve(__dirname)))

const { loginPagePath } = (artsyPassport as any).options

app.use(
  artsyPassport(
    Object.assign(
      {
        CurrentUser: Backbone.Model,
        ARTSY_URL: API_URL,
      },
      process.env
    )
  )
)

app.use(RelayMiddleware)
app.use(UserMiddleware)
app.use(SetSessionIDMiddleware)

app.get("/", Home)
app.get(loginPagePath, Login)
app.get("/thank-you", ThankYou)
app.get("/inquiries", Inquiries)
app.get("/forgot-password", ForgotPassword)

export default app
