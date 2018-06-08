import React, { SFC } from "react"
import styled from "styled-components"
import { Sans } from "@artsy/palette"
import { pick } from "lodash/fp"

import {
  border,
  borderRadius,
  color,
  maxWidth,
  space,
  textAlign,
  width,
} from "styled-system"

export const Button: SFC = ({ children, ...rest }) => {
  const textProps = pick(["color", "size", "weight"], rest)

  return (
    <Container {...rest}>
      <Sans {...textProps}>{children}</Sans>
    </Container>
  )
}

Button.defaultProps = {
  color: "white100",
  backgroundColor: "black100",
  border: 0,
  borderRadius: 3,
  px: 4,
  py: 3,
  size: 2,
}

const Container = styled.button`
  ${border};
  ${borderRadius};
  ${color};
  ${space};
  ${width};
  ${textAlign};
  ${maxWidth};

  cursor: pointer;
  text-transform: uppercase;

  &:focus {
    outline: 0;
  }
`
