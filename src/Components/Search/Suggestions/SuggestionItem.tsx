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
    // `color="black100"` is misleading.
    //  The actual color doesn't really matter - the child element controls the displayed color.
    //  We specify color only because it makes the text not underlined on hover.
    return (
      <Link noUnderline href={href} color="black100">
        <SuggestionItemContainer>Search "{query}"</SuggestionItemContainer>
      </Link>
    )
  }

  const matches = match(display, query)
  const parts = parse(display, matches)

  return (
    // `color="black100"` is misleading.
    //  The actual color doesn't really matter - the child elements control the displayed color.
    //  We specify color only because it makes the text not underlined on hover.
    <Link noUnderline href={href} color="black100">
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
