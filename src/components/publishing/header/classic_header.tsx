import * as React from "react"
import styled from "styled-components"
import Fonts from "../fonts"

const ClassicHeaderContainer = styled.div`
  ${Fonts.garamond("s40")}
  display: flex;
  flex-direction: column;
  text-align: center;
`

interface ClassicHeaderProps {
  article?: any
}

const ClassicHeader: React.SFC<ClassicHeaderProps> = props => {
  const { article } = props
  return (
    <ClassicHeaderContainer>
      {article.title}
    </ClassicHeaderContainer>
  )
}

export default ClassicHeader
