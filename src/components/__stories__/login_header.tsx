import * as React from 'react'
import { storiesOf, action } from "@kadira/storybook"

import LoginHeader from "../login_header"

storiesOf("LoginHeader", LoginHeader)
  .add("Simple login header", () => (
    <LoginHeader/>
  ))