import { color, Flex, Sans, Serif } from "@artsy/palette"
import React, { SFC } from "react"

interface Props {
  display: string
  label: string
}

export const SuggestionItem: SFC<Props> = ({ display, label }) => {
  return (
    <Flex pl={3} pt={4} justifyContent="center" flexDirection="column">
      <Serif size="2">{display}</Serif>
      <Sans color={color("black30")} size="2">
        {label}
      </Sans>
    </Flex>
  )
}
