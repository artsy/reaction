import { action, storiesOf } from "@kadira/storybook"
import * as React from "react"
import * as Relay from "react-relay"

import Login from "../login"

storiesOf("Login Page", Login)
  .add("no modal", () => (
    <Login form={{url: "/"}} />
  ))
