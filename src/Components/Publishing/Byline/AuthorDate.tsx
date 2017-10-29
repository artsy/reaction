import React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import { getAuthorByline, getDate } from "../Constants"
import { Fonts } from "../Fonts"

interface AuthorDateProps {
  authors?: any
  date?: string
  layout: string
}

export const Author: React.SFC<AuthorDateProps> = props => {
  return (
    <StyledAuthor className="author" layout={props.layout}>
      By {getAuthorByline(props.authors)}
    </StyledAuthor>
  )
}

export const Date: React.SFC<AuthorDateProps> = props => {
  return (
    <Text className="date" layout={props.layout}>
      {getDate(props.date, props.layout)}
    </Text>
  )
}

const div: StyledFunction<AuthorDateProps & React.HTMLProps<HTMLInputElement>> = styled.div

const Text = div`
  ${props => (props.layout === "condensed" ? Fonts.unica("s14", "medium") : Fonts.unica("s16", "medium"))}
  margin: 10px 30px 0 0;
  &.date {
    white-space: nowrap;
  }
  ${props => pMedia.sm`
    ${props.layout === "condensed" ? Fonts.unica("s12", "medium") : Fonts.unica("s14", "medium")}
    ${Fonts.unica("s14", "medium")}
    margin: 10px 20px 0 0;
  `}
`
const adjustForCondensed = layout => {
  return layout === "condensed"
    ? `
  &:before {
    min-width: 8px;
    min-height: 8px;
    margin: 0 5px 1px;
  }`
    : ""
}
const StyledAuthor = Text.extend`
  &:before {
    content: "";
    display: inline-block;
    min-width: 10px;
    min-height: 10px;
    border-radius: 50%;
    margin: 6px 10px 1px 0;
    background-color: ${props => (props.layout === "fullscreen" ? "#fff" : "#000")};
  }
  ${props => adjustForCondensed(props.layout)}
  ${pMedia.sm`
    &:before {
      min-width: 8px;
      min-height: 8px;
    }
  `}
`
