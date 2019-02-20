import { color, Link, Sans, Serif } from "@artsy/palette"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"
import React, { SFC } from "react"
import { SuggestionItemContainer } from "./SuggestionItemContainer"
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
        <SuggestionItemContainer>Search "{query}"</SuggestionItemContainer>
      </Link>
    )
  }

  const matches = match(display, query)
  const parts = parse(display, matches)

  return (
    <Link noUnderline href={href}>
      <SuggestionItemContainer>
        <Serif size="3">
          {parts.map(({ highlight, text }, index) => {
            return highlight ? <strong key={index}>{text}</strong> : text
          })}
        </Serif>
        <Sans color={color("black60")} size="2">
          {label}
        </Sans>
      </SuggestionItemContainer>
    </Link>
  )
}
