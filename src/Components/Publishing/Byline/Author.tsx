import styled from "styled-components"
import { Sans } from "@artsy/palette"
import React from "react"
import { pMedia } from "../../Helpers"
import { getAuthorByline } from "../Constants"
import { BylineLayout } from "../Typings"

interface AuthorProps {
  authors?: any
  color?: string
  layout?: BylineLayout
  size?:
    | "1"
    | "2"
    | "3"
    | "3t"
    | "4"
    | "4t"
    | "5"
    | "5t"
    | "6"
    | "8"
    | "10"
    | "12"
    | "14"
    | "16"
}

export const Author: React.SFC<AuthorProps> = props => {
  const { color, layout, size } = props
  const condensed = layout === "condensed"
  const fontSize = size ? size : condensed ? "2" : "3t"

  return (
    <Sans size={fontSize} weight="medium">
      <StyledAuthor condensed={condensed} color={color}>
        {getAuthorByline(props.authors)}
      </StyledAuthor>
    </Sans>
  )
}

Author.defaultProps = {
  color: "black",
}

export const StyledAuthor = styled.div.attrs<{
  condensed?: boolean
  color: string
}>({})`
  ${props => bullet(props.color, props.condensed)} margin: 10px 30px 0 0;
  ${props => pMedia.sm` margin: 10px 20px 0 0;`};
`

const bullet = (color, condensed = false) => {
  return `
    &:before {
      content: "";
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin: ${condensed ? "0 5px 1px 0;" : "6px 10px 1px 0"};
      background-color: ${color};
    }
  `
}
