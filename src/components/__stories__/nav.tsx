import { storiesOf } from "@kadira/storybook"
import * as React from "react"

import Nav from "../nav"
import NavItem from "../nav_item"

storiesOf("Nav", Nav)
  .add("Simple Nav Bar", () => (
    <Nav>
      <NavItem href="https://www.artsy.net">Back To Artsy</NavItem>
    </Nav>
  ))
