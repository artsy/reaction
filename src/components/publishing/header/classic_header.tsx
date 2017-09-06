import * as React from "react"
import styled from "styled-components"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"
import AuthorDateClassic from "./author_date_classic"

interface ClassicHeaderProps {
  article?: any
}

const ClassicHeader: React.SFC<ClassicHeaderProps> = props => {
  const { article } = props
  return (
    <ClassicHeaderContainer>
      {props.children}
      <AuthorDateClassic authors={article.contributing_authors} author={article.author} date={article.published_at} />
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
  p, > p {
    ${Fonts.garamond("s19")}
    line-height: 1.35em;
    text-align: left;
    max-width: 580px;
    margin: 0 auto;
    padding-bottom: 30px;
  }
  ${pMedia.lg`
    padding: 0 20px;
  `}
  ${pMedia.xs`
    text-align: left;
    p, > p {
      ${Fonts.garamond("s17")}
      line-height: 1.35em;
    }
  `}
`

export default ClassicHeader
