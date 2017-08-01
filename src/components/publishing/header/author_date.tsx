import moment from "moment-timezone"
import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"

interface BulletTextProps extends React.HTMLProps<HTMLDivElement> {
  layout?: string
}

interface AuthorDateProps {
  authors: any
  layout?: string
  date?: string
}

const getAuthorByline = authors => {
  if (authors) {
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

const getDate = date => moment(date).tz("America/New_York").format("MMM D, YYYY h:mm a")

const AuthorDate: React.SFC<AuthorDateProps> = props => {
  const { authors, layout, date } = props
  return (
    <AuthorDateContainer>
      <BulletText layout={layout}>By {getAuthorByline(authors)}</BulletText>
      <BulletText layout={layout}>{getDate(date)}</BulletText>
    </AuthorDateContainer>
  )
}

const div: StyledFunction<BulletTextProps> = styled.div

const BulletText = div`
  ${Fonts.unica("s19", "medium")}
  &:nth-child(2) {
    margin: 0 0 0 30px;
  }
  &:before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: ${props => (props.layout === "fullscreen" ? "#fff" : "#000")};
  }
  ${pMedia.sm`
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
