import { action, storiesOf } from "@kadira/storybook"
import * as React from "react"

import LoginHeader from "../login_header"
import Title from "../title"

storiesOf("LoginHeader", LoginHeader)
  .add("Simple login header", () => (
    <LoginHeader> 
      <Title>Welcome back, please log in to your account.</Title>
    </LoginHeader>
  ))
