import * as React from "react"
import styled from "styled-components"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"
import AuthorDate from "./author_date"

interface StandardHeaderProps {
  article?: any
}

const StandardHeader: React.SFC<StandardHeaderProps> = props => {
  const { article } = props
  return (
    <StandardHeaderContainer>
      <Vertical>{article.vertical.name}</Vertical>
      {props.children}
      <AuthorDate authors={article.contributing_authors} date={article.published_at} layout="standard" />
    </StandardHeaderContainer>
  )
}

const StandardHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 780px;
  width: 100%;
  margin-bottom: 60px;
`

const Vertical = styled.div`
  ${Fonts.unica("s19", "medium")}
  ${pMedia.xs`
    ${Fonts.unica("s14", "medium")}
  `}
`

export default StandardHeader
