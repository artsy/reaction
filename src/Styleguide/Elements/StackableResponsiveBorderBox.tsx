import { space } from "@artsy/palette"
// @ts-ignore
import React from "react"
import { media } from "styled-bootstrap-grid"
import styled from "styled-components"
import { BorderBox } from "Styleguide/Elements/Box"

export const StackableResponsiveBorderBox = styled(BorderBox)`
  :not(:first-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  :not(:last-child) {
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  ${media.sm`
    padding: ${space(3)}px;
  `};
`
