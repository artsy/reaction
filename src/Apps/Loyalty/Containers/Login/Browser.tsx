import * as React from "react"
import { render } from "react-dom"
import Login from "./index"

import * as sharify from "sharify"
import { LoginResponseLocalData } from "../../types"

const data = sharify.data as LoginResponseLocalData

render(<Login form={data.FORM_DATA} />, document.getElementById("app-container"))
