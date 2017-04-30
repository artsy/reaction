import IsomorphicRelay from "isomorphic-relay"
import * as React from "react"
import { render } from "react-dom"
import Login from "./index"

import * as sharify from "sharify"
import { ResponseLocalData } from "../../types"

const data = sharify.data as ResponseLocalData

render(
  <Login form={data.FORM_DATA} />,
  document.getElementById("app-container"),
)
