import { unica } from "Assets/Fonts"
import React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import { getAuthorByline, getDate } from "../Constants"
import { ArticleLayout, BylineLayout, DateFormat } from "../Typings"

interface AuthorProps {
  authors?: any
  layout?: BylineLayout
  articleLayout?: ArticleLayout
  color?: string
}

interface DateProps {
  date?: string
  layout?: BylineLayout
  format?: DateFormat
}

export const Author: React.SFC<AuthorProps> = props => {
  const { color, layout } = props
  return (
    <StyledAuthor
      className="author"
      condensed={layout === "condensed"}
      color={color}
      withBullet
    >
      By {getAuthorByline(props.authors)}
    </StyledAuthor>
  )
}

export const Date: React.SFC<DateProps> = props => {
  const condensed = props.layout === "condensed"
  const format = props.format || (condensed ? "condensed" : "default")

  return (
    <Text className="date" condensed={condensed}>
      {getDate(props.date, format)}
    </Text>
  )
}

Author.defaultProps = {
  color: "black",
}

export interface TextProps {
  condensed?: boolean
  withBullet?: boolean
}

const div: StyledFunction<TextProps & React.HTMLProps<HTMLInputElement>> =
  styled.div

const Text = div`
  ${props =>
    props.condensed ? unica("s14", "medium") : unica("s16", "medium")}
  margin: 10px 30px 0 0;
  &.date {
    white-space: nowrap;
  }
  ${props => pMedia.sm`
    ${props.condensed ? unica("s12", "medium") : unica("s14", "medium")}
    ${unica("s14", "medium")}
    margin: 10px 20px 0 0;
  `}
`
const adjustForCondensed = condensed => {
  return condensed
    ? `
  &:before {
    min-width: 8px;
    min-height: 8px;
    margin: 0 5px 1px 0;
  }`
    : ""
}

const bullet = color => {
  return `
    &:before {
      content: "";
      display: inline-block;
      min-width: 10px;
      min-height: 10px;
      border-radius: 50%;
      margin: 6px 10px 1px 0;
      background-color: ${color};
    }
  `
}

export const StyledAuthor = Text.extend`
  ${props => (props.withBullet ? bullet(props.color) : "")} ${props =>
  adjustForCondensed(props.condensed)} ${pMedia.sm`
    &:before {
      min-width: 8px;
      min-height: 8px;
    }
  `};
`
