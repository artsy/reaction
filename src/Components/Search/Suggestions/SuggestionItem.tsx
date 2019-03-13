import { Box, color, Flex, Link, Sans, Serif } from "@artsy/palette"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"
import React, { SFC } from "react"
import styled from "styled-components"

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
    <Box bg={isHighlighted ? "black5" : "white100"}>
      <Link color="black100" href={href} noUnderline>
        <SuggestionWrapper>
          <InnerWrapper
            flexDirection="column"
            flexGrow="1"
            justifyContent="center"
          >
            <Suggestion {...props} />
          </InnerWrapper>
          {isHighlighted && (
            <Flex flexGrow="0" px={2}>
              <HighlightIcon />
            </Flex>
          )}
        </SuggestionWrapper>
      </Link>
    </Box>
  )
}

const InnerWrapper = styled(Flex)`
  overflow: hidden;
  white-space: nowrap;
`

export const PLACEHOLDER = "Search by artist, gallery, style, theme, tag, etc."
export const PLACEHOLDER_XS = "Search Artsy"

export const EmptySuggestion = () => (
  <SuggestionWrapper>{PLACEHOLDER}</SuggestionWrapper>
)

const SuggestionWrapper = props => (
  <Flex alignItems="center" flexDirection="row" height="62px" pl={3}>
    {props.children}
  </Flex>
)

const FirstSuggestion = ({ query }) => <>Search "{query}"</>

const DefaultSuggestion = ({ display, label, query }) => {
  const matches = match(display, query)
  const parts = parse(display, matches)
  const partTags = parts.map(
    ({ highlight, text }, index) =>
      highlight ? <strong key={index}>{text}</strong> : text
  )

  return (
    <>
      <SuggestionTitle size="3">{partTags}</SuggestionTitle>
      <Sans color={color("black60")} size="2">
        {label}
      </Sans>
    </>
  )
}

const SuggestionTitle = styled(Serif)`
  overflow: hidden;
  text-overflow: ellipsis;
`

const HighlightIcon = () => (
  <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path fill="none" d="M0 0h18v18H0z" />
      <path
        d="M4.883 11.244l3.108 3.068-.693.688L3 10.758l4.299-4.23.692.689-3.106 3.056h9.134V3H15v8.244H4.883z"
        fill="#000"
        fillRule="nonzero"
      />
    </g>
  </svg>
)
