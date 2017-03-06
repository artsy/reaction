import { action, storiesOf } from "@kadira/storybook"
import * as React from "react"

import styled from "styled-components"
import SimpleNav from "../simple_nav"
import TextLink from "../text_link"

import * as fonts from "../../assets/fonts"

const LinkContainer = styled.span`
  position: relative;
  top: -8px;
  font-family: ${ fonts.primary.fontFamily };
`

storiesOf("Simple Nav", SimpleNav)
  .add("Simple Nav Bar", () => (
    <SimpleNav>
      <LinkContainer>
        <TextLink href="https://www.artsy.net">Back To Artsy</TextLink>
      </LinkContainer>
    </SimpleNav>
  ))
