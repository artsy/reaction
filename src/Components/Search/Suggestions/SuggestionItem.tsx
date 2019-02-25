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
  let children = <>`Search "${query}"`</>

  if (label !== "FirstItem") {
    const matches = match(display, query)
    const parts = parse(display, matches)
    const partTags = parts.map(
      ({ highlight, text }, index) =>
        highlight ? <strong key={index}>{text}</strong> : text
    )

    children = (
      <>
        <Serif size="3">{partTags}</Serif>
        <Sans color={color("black60")} size="2">
          {label}
        </Sans>
      </>
    )
  }

  return (
    // `color="black100"` is misleading on Link. The value doesn't matter
    // because the child element controls the displayed color. Color is only
    // specified to make the text not underlined on hover.
    <Link noUnderline href={href} color="black100">
      <SuggestionItemContainer>{children}</SuggestionItemContainer>
    </Link>
  )
}
