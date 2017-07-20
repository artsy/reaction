import * as React from "react"
import styled from "styled-components"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"
import AuthorDate from "./author_date"

const StandardHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  ${Fonts.garamond("s50")}
  margin-bottom: 60px;
  ${pMedia.sm`
    ${Fonts.garamond("s34")}
  `}
`
const Vertical = styled.div`
  ${Fonts.unica("s19", "medium")}
  ${pMedia.sm`
    ${Fonts.unica("s14", "medium")}
  `}
`
interface StandardHeaderProps {
  article?: any
}

const StandardHeader: React.SFC<StandardHeaderProps> = props => {
  const { article } = props
  return (
    <StandardHeaderContainer>
      <Vertical>{article.vertical.name}</Vertical>
      <Title>
        {article.title}
      </Title>
      <AuthorDate authors={article.contributing_authors} date={article.published_at} layout="standard" />
    </StandardHeaderContainer>
  )
}

export default StandardHeader
