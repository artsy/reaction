import React from "react"
import styled from "styled-components"
import { GlobalStyles } from "../Elements/GlobalStyles"

const Container = styled.div`
  padding: 20px;
`

export const InfoContainer = props => {
  return (
    <GlobalStyles>
      <Container>{props.children}</Container>
    </GlobalStyles>
  )
}
