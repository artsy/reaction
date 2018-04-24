import React from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { Byline } from "../Byline/Byline"
import { Fonts } from "../Fonts"

interface StandardHeaderProps {
  article?: any
  date?: string
  title: any
  vertical?: any
}

export const StandardHeader: React.SFC<StandardHeaderProps> = props => {
  const { article, date, title, vertical } = props
  return (
    <StandardHeaderParent>
      <StandardHeaderContainer>
        <Vertical>{vertical}</Vertical>
        <Title>{title}</Title>
        <Byline article={article} layout="standard" date={date && date} />
      </StandardHeaderContainer>
    </StandardHeaderParent>
  )
}

const StandardHeaderParent = styled.div`
  margin: 0 40px;
  ${pMedia.sm`
    margin: 0 20px;
  `};
`

const StandardHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1250px;
  width: 100%;
  margin: 40px auto;
  box-sizing: border-box;
  ${pMedia.sm`
    margin: 30px auto;
  `};
`
const Title = styled.div`
  ${Fonts.garamond("s50")} margin-bottom: 50px;
  ${pMedia.sm`
    ${Fonts.garamond("s34")}
  `};
`
const Vertical = styled.div`
  ${Fonts.unica("s16", "medium")} margin-bottom: 10px;
  ${pMedia.sm`
    ${Fonts.unica("s14", "medium")}
  `};
`
