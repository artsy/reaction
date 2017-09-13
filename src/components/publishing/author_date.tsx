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
  if (layout === "condensed") {
    return (
      <AuthorDateContainer>
        <CondensedText className="author" layout={layout}>By {getAuthorByline(authors)}</CondensedText>
        <CondensedText className="date" layout={layout}>{getDate(date, layout)}</CondensedText>
      </AuthorDateContainer>
    )
  } else {
    return (
      <AuthorDateContainer>
        <Text className="author" layout={layout}>By {getAuthorByline(authors)}</Text>
        <Text className="date" layout={layout}>{getDate(date, layout)}</Text>
      </AuthorDateContainer>
    )
  }
}

const div: StyledFunction<BulletTextProps> = styled.div

const Text = div`
  ${Fonts.unica("s16", "medium")}
  &.author {
    display: flex;
    align-items: baseline;
    &:before {
      content: "";
      display: inline-block;
      min-width: 10px;
      min-height: 10px;
      border-radius: 50%;
      margin-right: 10px;
      background-color: ${props => (props.layout === "fullscreen" ? "#fff" : "#000")};
    }
  }
  &.date {
    white-space: nowrap;
    margin: 0 0 0 20px;
  }
  ${pMedia.sm`
    ${Fonts.unica("s14", "medium")}
    margin: 0 20px 0 0;
    &.author:before {
      width: 8px;
      height: 8px;
    }
  `}
`
const CondensedText = Text.extend`
  ${Fonts.unica("s14", "medium")}
  &:.author:before {
    min-width: 8px;
    min-height: 8px;
    margin-right: 5px;
  }
  ${pMedia.sm`
    ${Fonts.unica("s12", "medium")}
  `}
`

const AuthorDateContainer = styled.div`
  display: flex;
`

export default AuthorDate
