import { Box, color, Flex, Sans, Serif } from "@artsy/palette"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"
import React, { SFC } from "react"
interface Props {
  display: string
  label: string
  query: string
}

export const SuggestionItem: SFC<Props> = ({ display, label, query }) => {
  if (label === "FirstItem") {
    return (
      <Box pl={3} pb={3}>
        Search "{query}"
      </Box>
    )
  }

  const matches = match(display, query)
  const parts = parse(display, matches)

  // TODO: Center text vertically
  return (
    <Flex pl={3} pb={3} justifyContent="center" flexDirection="column">
      <Serif size="2">
        {parts.map(({ highlight, text }, index) => {
          return highlight ? <strong key={index}>{text}</strong> : text
        })}
      </Serif>
      <Sans color={color("black30")} size="2">
        {label}
      </Sans>
    </Flex>
  )
}
