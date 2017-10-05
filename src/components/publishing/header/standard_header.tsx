import * as React from "react"
import styled from "styled-components"
import { pMedia } from "../../helpers"
import Byline from "../byline/byline"
import Fonts from "../fonts"

interface StandardHeaderProps {
  article?: any
  title: any
  vertical?: any
}

const StandardHeader: React.SFC<StandardHeaderProps> = props => {
  const { article, title, vertical } = props
  return (
    <StandardHeaderContainer>
      <Vertical>{vertical}</Vertical>
      <Title>{title}</Title>
      <Byline article={article} layout="standard" />
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
const Title = styled.div`
  ${Fonts.garamond("s50")}
  margin-bottom: 50px;
  ${pMedia.xs`
    ${Fonts.garamond("s34")}
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
