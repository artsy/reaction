import { garamond } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { AuthorDateClassic } from "./AuthorDateClassic"

interface ClassicHeaderProps {
  article?: any
  date?: string
  title: any
  leadParagraph?: any
  isMobile?: any
}

export const ClassicHeader: React.SFC<ClassicHeaderProps> = props => {
  const { article, date, leadParagraph, title } = props
  return (
    <ClassicHeaderContainer>
      <Title>{title}</Title>
      {leadParagraph}
      <AuthorDateClassic
        authors={article.contributing_authors}
        author={article.author}
        date={date ? date : article.published_at}
      />
    </ClassicHeaderContainer>
  )
}

const ClassicHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 100%;
  margin: 40px auto;
  box-sizing: border-box;
  text-align: center;
  p,
  > p {
    ${garamond("s19")};
    line-height: 1.35em;
    text-align: left;
    max-width: 580px;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 30px;
  }

  ${pMedia.xl`
    padding: 0 20px;
  `} ${pMedia.xs`
    text-align: left;
    p, > p {
      ${garamond("s17")};
      line-height: 1.35em;
    }
  `};
`
const Title = styled.div`
  ${garamond("s37")};
  margin-bottom: 30px;

  ${pMedia.xs`
    ${garamond("s34")}
  `};
`
