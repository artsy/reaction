import { Box, Link, Sans, Serif } from "@artsy/palette"
import Checkbox from "Components/Checkbox"
import React from "react"
import { data as sd } from "sharify"
import styled from "styled-components"

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  error?: string
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: boolean
}

export const ConditionsOfSaleCheckbox: React.FC<Props> = ({
  error,
  name,
  onChange,
  onBlur,
  value,
  ...props
}) => {
  return (
    <Box mx="auto">
      <StyledCheckbox {...{ checked: value, error, onChange, onBlur, name }}>
        <Serif display="inline" color="black60" size="3t" ml={0.5}>
          {"Agree to "}
          <Serif display="inline" color="black100" size="3t">
            <Link
              color="black100"
              href={`${sd.APP_URL}/conditions-of-sale`}
              target="_blank"
            >
              Conditions of Sale
            </Link>
          </Serif>
          .
        </Serif>
      </StyledCheckbox>
      {error && (
        <Sans mt={1} color="red100" size="2">
          {error}
        </Sans>
      )}
    </Box>
  )
}

const StyledCheckbox = styled(Checkbox)`
  margin: 5px 0;
  align-items: flex-start;
`
