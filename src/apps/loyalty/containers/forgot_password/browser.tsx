import * as React from "react"
import { render } from "react-dom"
import ForgotPassword from "./index"

const submitUrl = require("sharify").data.SUBMIT_URL
const appToken = require("sharify").data.APP_TOKEN

import { initAnalytics } from "../../analytics"

initAnalytics()
render(
  <ForgotPassword submitEmailUrl={submitUrl} appToken={appToken} />,
  document.getElementById("app-container"),
)
