import moment from "moment-timezone"
import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../helpers"
import Fonts from "./fonts"

interface BulletTextProps extends React.HTMLProps<HTMLDivElement> {
  layout?: string
}

interface AuthorDateProps {
  authors: any
  layout?: string
  date?: string
}

const getAuthorByline = authors => {
  if (authors && authors.length > 0) {
    if (authors.length > 1) {
      const str = authors.reduce((prev, curr, i) => {
        let delim
        const len = authors.length
        if (i === len - 1) {
          delim = " and "
        } else if (i === 0) {
          delim = ""
        } else {
          delim = ", "
        }
        return prev + delim + curr.name
      }, "")
      return str
    } else {
      return authors[0].name
    }
  } else {
    return "Artsy Editorial"
  }
}

const getDate = (date, layout) => {
  return layout === "condensed"
    ? moment(date).tz("America/New_York").format("MMM D, YYYY")
    : moment(date).tz("America/New_York").format("MMM D, YYYY h:mm a")
}

const AuthorDate: React.SFC<AuthorDateProps> = props => {
  const { authors, layout, date } = props
  return (
    <AuthorDateContainer>
      <BulletText layout={layout}>By {getAuthorByline(authors)}</BulletText>
      <BulletText layout={layout}>{getDate(date, layout)}</BulletText>
    </AuthorDateContainer>
  )
}
const getBulletSize = layout => (layout === "condensed" ? "8px" : "10px")
const getBulletMargin = layout => (layout === "condensed" ? "5px" : "10px")
const getDateMargin = layout => (layout === "condensed" ? "0 0 0 20px" : "0 0 0 30px")

const div: StyledFunction<BulletTextProps> = styled.div

const BulletText = div`
  ${props => (props.layout === "condensed" ? Fonts.unica("s14", "medium") : Fonts.unica("s16", "medium"))}
  &:nth-child(2) {
    margin: ${props => getDateMargin(props.layout)};
  }
  &:before {
    content: "";
    display: inline-block;
    width: ${props => getBulletSize(props.layout)};
    height: ${props => getBulletSize(props.layout)};
    border-radius: 50%;
    margin-right: ${props => getBulletMargin(props.layout)};
    background-color: ${props => (props.layout === "fullscreen" ? "#fff" : "#000")};
  }
  ${pMedia.xs`
    margin: 0 20px 0 0;
    ${Fonts.unica("s14", "medium")}
    &:before {
      width: 8px;
      height: 8px;
    }
  `}
`
const AuthorDateContainer = styled.div`
  display: flex;
`

export default AuthorDate
