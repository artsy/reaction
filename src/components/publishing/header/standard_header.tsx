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
  const vertical = article.vertical ? article.vertical.name : false
  return (
    <StandardHeaderContainer>
      <Vertical>{vertical}</Vertical>
      {props.children}
      <AuthorDate authors={article.contributing_authors} date={article.published_at} layout="standard" />
    </StandardHeaderContainer>
  )
}

const StandardHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1250px;
  width: 100%;
  margin: 40px auto;
  box-sizing: border-box;
  ${pMedia.lg`
    padding: 0 20px;
  `}
  ${pMedia.xs`
    margin: 30px auto;
  `}
`

const Vertical = styled.div`
  ${Fonts.unica("s16", "medium")}
  margin-bottom: 10px;
  ${pMedia.xs`
    ${Fonts.unica("s14", "medium")}
  `}
`

export default StandardHeader
