import * as React from "react"
import styled from "styled-components"
import Fonts from "../fonts"

const StandardHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  ${Fonts.garamond("s50")}
`
const Vertical = styled.div`
  ${Fonts.unica("s19", "medium")}
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
    </StandardHeaderContainer>
  )
}

export default StandardHeader
