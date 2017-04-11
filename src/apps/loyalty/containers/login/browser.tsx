import IsomorphicRelay from "isomorphic-relay"
import * as React from "react"
import { render } from "react-dom"
import Login from "./index"

const formData = require("sharify").data.FORM_DATA

render(
  <Login form={formData} />,
  document.getElementById("app-container"),
)
