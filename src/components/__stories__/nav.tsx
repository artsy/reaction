import { action, storiesOf } from "@kadira/storybook"
import * as React from "react"
import styled from "styled-components"

import Nav from "../nav"
import NavItem from "../nav_item"
import TextLink from "../text_link"

import * as fonts from "../../assets/fonts"

storiesOf("Nav", Nav)
  .add("Simple Nav Bar", () => (
    <Nav>
      <NavItem href="https://www.artsy.net" >Back To Artsy</NavItem>
    </Nav>
  ))
