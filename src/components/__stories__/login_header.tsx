import * as React from 'react'
import { storiesOf, action } from "@kadira/storybook"

import LoginHeader from "../login_header"
import Title from "../title"

storiesOf("LoginHeader", LoginHeader)
  .add("Simple login header", () => (
    <LoginHeader> 
      <Title>Welcome back, please log in to your account.</Title>
    </LoginHeader>
  ))