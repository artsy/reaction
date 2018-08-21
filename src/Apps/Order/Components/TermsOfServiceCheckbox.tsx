import { Serif } from "@artsy/palette"
import React from "react"
import { Checkbox } from "Styleguide/Elements/Checkbox"

export const TermsOfServiceCheckbox = props => {
  return (
    <Checkbox {...props}>
      <Serif size="3" color="black60">
        {"Agree to "}
        <a href="https://www.artsy.net/terms" target="_blank">
          Terms & Conditions
        </a>
        {". All sales are final."}
      </Serif>
    </Checkbox>
  )
}
