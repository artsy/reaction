import moment from "moment"
import * as React from "react"
import styled, { StyledFunction } from "styled-components"

interface BulletTextProps extends React.HTMLProps<HTMLDivElement> {
  layout?: string
}

const div: StyledFunction<BulletTextProps> = styled.div

const getAuthorByline = authors => {
  if (authors) {
    authors.reduce((prev, curr, i) => {
      return prev + (i === authors.length - 1 ? " and " : ", ") + curr.name
    }, "")
  } else {
    return "Artsy Editorial"
  }
}

const getDate = date => moment(date).local().format("MMM Do, YYYY h:mm a")

interface AuthorDateProps {
  authors: any
  layout?: string
  date?: string
}

const AuthorDate: React.SFC<AuthorDateProps> = props => {
  const { layout, authors, date } = props
  return (
    <AuthorDateContainer>
      <BulletText layout={layout}>{getAuthorByline(authors)}</BulletText>
      <BulletText layout={layout}>{getDate(date)}</BulletText>
    </AuthorDateContainer>
  )
}

const BulletText = div`
  margin: ${props => (props.layout !== "split" ? "0 0 0 30px" : "0 30px 0 0")};
  &:before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: ${props => (props.layout === "fullscreen" ? "#fff" : "#000")};
  }
`
const AuthorDateContainer = styled.div`
  display: flex;
`

export default AuthorDate
