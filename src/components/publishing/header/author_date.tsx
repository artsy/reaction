import moment from "moment-timezone"
import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"

interface BulletTextProps extends React.HTMLProps<HTMLDivElement> {
  layout?: string
}

const div: StyledFunction<BulletTextProps> = styled.div

const getAuthorByline = authors => {
  if (authors) {
    if (authors.length > 1) {
      authors.reduce((prev, curr, i) => {
        return prev + (i === authors.length - 1 ? " and " : ", ") + curr.name
      }, "")
    } else {
      return authors[0].name
    }
  } else {
    return "Artsy Editorial"
  }
}

const getDate = date => moment(date).tz("America/New_York").format("MMM Do, YYYY h:mm a")

interface AuthorDateProps {
  authors: any
  layout?: string
  date?: string
}

const AuthorDate: React.SFC<AuthorDateProps> = props => {
  const { layout, authors, date } = props
  return (
    <AuthorDateContainer>
      <BulletText layout={layout}>By {getAuthorByline(authors)}</BulletText>
      <BulletText layout={layout}>{getDate(date)} EST</BulletText>
    </AuthorDateContainer>
  )
}

const BulletText = div`
  ${Fonts.unica("s19", "medium")}
  margin: ${props => (props.layout === "split" || props.layout === "standard" ? "0 30px 0 0" : "0 0 0 30px")};
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
    ${Fonts.unica("s16", "medium")}
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
