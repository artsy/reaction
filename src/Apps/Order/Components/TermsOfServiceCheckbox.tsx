import { color, Serif } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { Checkbox } from "Styleguide/Elements/Checkbox"

export const TermsOfServiceCheckbox = props => {
  return (
    <Checkbox {...props}>
      <Serif size="3" color={color("black60")}>
        {"Agree to "}
        <A href="https://www.artsy.net/terms" target="_blank">
          Terms & Conditions
        </A>
        {". All sales are final."}
      </Serif>
    </Checkbox>
  )
}

const A = styled.a`
  color: ${props => props.color};
`
