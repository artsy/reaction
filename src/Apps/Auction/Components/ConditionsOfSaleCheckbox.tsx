import { Link, Serif } from "@artsy/palette"
import Checkbox from "Components/Checkbox"
import React from "react"
import styled from "styled-components"

export const ConditionsOfSaleCheckbox = ({
  error,
  name,
  onChange,
  onBlur,
  value,
  ...props
}) => {
  const color = error && !value ? "red100" : "black60"
  return (
    <StyledCheckbox {...{ checked: value, error, onChange, onBlur, name }}>
      <Serif color={color} size="3t" ml={0.5}>
        {"Agree to "}
        <Link
          href="https://www.artsy.net/conditions-of-sale"
          target="_blank"
          color={color}
        >
          Conditions of Sale
        </Link>
        .
      </Serif>
    </StyledCheckbox>
  )
}

const StyledCheckbox = styled(Checkbox)`
  margin: 5px 0;
  align-items: flex-start;
`
