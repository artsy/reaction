import { avantgarde } from "Assets/Fonts"
import moment from "moment-timezone"
import React from "react"
import styled, { StyledFunction } from "styled-components"

interface AuthorDateClassicProps {
  authors?: any
  author: any
  date?: string
}

interface TextSmProps extends React.HTMLProps<HTMLDivElement> {
  color?: string
}

const getAuthorByline = (authors, author) => {
  let formattedAuthor
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
      formattedAuthor = str
    } else {
      formattedAuthor = authors[0].name
    }

    return (
      <div>
        <TextSm>{author.name}</TextSm>
        <div>{"By " + formattedAuthor}</div>
      </div>
    )
  } else {
    return author.name
  }
}

const getDate = date =>
  moment(date)
    .tz("America/New_York")
    .format("MMM D, YYYY h:mm a")

export const AuthorDateClassic: React.SFC<AuthorDateClassicProps> = props => {
  const { authors, author, date } = props
  return (
    <AuthorDateClassicContainer>
      {getAuthorByline(authors, author)}
      <TextSm color="#666">{getDate(date)}</TextSm>
    </AuthorDateClassicContainer>
  )
}

const div: StyledFunction<TextSmProps> = styled.div

const TextSm = div`
  ${avantgarde("s11")}
  color: ${props => (props.color ? props.color : "#000")};
`
const AuthorDateClassicContainer = styled.div`
  display: block;
  ${avantgarde("s13")};
`
