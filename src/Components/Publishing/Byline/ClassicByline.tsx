import { color } from "@artsy/palette"
import { avantgarde } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { getAuthorByline, getDate } from "../Constants"
import { ArticleData } from "../Typings"

interface ClassicBylineProps {
  date?: string
  article?: ArticleData
}

export const ClassicByline: React.SFC<ClassicBylineProps> = props => {
  const {
    article: { contributing_authors, author, published_at },
    date,
  } = props

  const contributors = getAuthorByline(contributing_authors, false)

  return (
    <ClassicBylineContainer>
      {contributors ? (
        <div>
          <TextSm>{author.name}</TextSm>
          <div>{`By ${contributors}`}</div>
        </div>
      ) : (
        author.name
      )}
      <TextSm color={color("black60")}>{getDate(date || published_at)}</TextSm>
    </ClassicBylineContainer>
  )
}

const TextSm = styled.div.attrs<{ color?: string }>({})`
  ${avantgarde("s11")}
  color: ${props => (props.color ? props.color : "black")};
`

const ClassicBylineContainer = styled.div`
  display: block;
  ${avantgarde("s13")};
`
