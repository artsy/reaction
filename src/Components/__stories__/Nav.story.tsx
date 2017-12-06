import { storiesOf } from "@storybook/react"
import React from "react"

import Nav from "../Nav"
import NavItem from "../NavItem"

storiesOf("Components/Nav", module).add("Simple Nav Bar", () =>
  <Nav>
    <NavItem href="https://www.artsy.net">Back To Artsy</NavItem>
  </Nav>
)
