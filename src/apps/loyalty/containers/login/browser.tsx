import IsomorphicRelay from "isomorphic-relay"
import * as React from "react"
import { render } from "react-dom"

import Login from "./index"

const formData = (window as any).FORM_DATA

render(
  <Login form={formData} />,
  document.getElementById("app-container"),
)
