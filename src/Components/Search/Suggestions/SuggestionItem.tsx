import { Box, color, Flex, Link, Sans, Serif } from "@artsy/palette"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"
import React, { SFC } from "react"

interface Props {
  display: string
  href: string
  isHighlighted: boolean
  label: string
  query: string
}

export const SuggestionItem: SFC<Props> = props => {
  const { label, href, isHighlighted } = props

  const Suggestion = label === "FirstItem" ? FirstSuggestion : DefaultSuggestion

  return (
    // Note: we've specified a color on the Link below to ensure an underline
    // is suppressed on hover - technically the value does not matter.
    <Box bg={isHighlighted ? "#ddd" : "#fff"}>
      <Link color="black100" href={href} noUnderline>
        <SuggestionWrapper>
          <Flex flexDirection="column" flexGrow="1" justifyContent="center">
            <Suggestion {...props} />
          </Flex>
          {isHighlighted && <HighlightIcon />}
        </SuggestionWrapper>
      </Link>
    </Box>
  )
}

export const PLACEHOLDER = "Search by artist, gallery, style, theme, tag, etc."

export const EmptySuggestion = () => (
  <SuggestionWrapper>
    {PLACEHOLDER}
  </SuggestionWrapper>
)

const SuggestionWrapper = props => (
  <Flex alignItems="center" flexDirection="row" height="62px" px={3}>
    {props.children}
  </Flex>
)

const FirstSuggestion = ({query}) => (<>Search "{query}"</>)

const DefaultSuggestion = ({display, label, query}) => {
  const matches = match(display, query)
  const parts = parse(display, matches)
  const partTags = parts.map(
    ({ highlight, text }, index) =>
      highlight ? <strong key={index}>{text}</strong> : text
  )

  return (
    <>
      <Serif size="3">{partTags}</Serif>
      <Sans color={color("black60")} size="2">
        {label}
      </Sans>
    </>
  )
}

const HighlightIcon = () => (
  <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd">
      <path fill="none" d="M0 0h18v18H0z"/>
      <path d="M4.883 11.244l3.108 3.068-.693.688L3 10.758l4.299-4.23.692.689-3.106 3.056h9.134V3H15v8.244H4.883z" fill="#000" fill-rule="nonzero"/>
    </g>
  </svg>
)
