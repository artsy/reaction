import React from "react"
import { render } from "react-dom"
import Login from "./index"

import sharify from "sharify"
import { LoginResponseLocalData } from "../../Types"

const data = sharify.data as LoginResponseLocalData

render(<Login form={data.FORM_DATA} />, document.getElementById("app-container"))
