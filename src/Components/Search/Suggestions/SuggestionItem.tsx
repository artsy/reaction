import { Box, color, Flex, Link, Sans, Serif } from "@artsy/palette"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"
import React, { SFC } from "react"
interface Props {
  display: string
  label: string
  query: string
  href: string
}

export const SuggestionItem: SFC<Props> = ({ href, display, label, query }) => {
  if (label === "FirstItem") {
    return (
      <Link noUnderline href={href}>
        <Box pl={3} pb={3}>
          Search "{query}"
        </Box>
      </Link>
    )
  }

  const matches = match(display, query)
  const parts = parse(display, matches)

  // TODO: Center text vertically
  return (
    <Link noUnderline href={href}>
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
    </Link>
  )
}
