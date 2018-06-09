import React from "react"
import styled from "styled-components"
import { GlobalStyles } from "../GlobalStyles"

const Container = styled.div`
  padding: 40px;
`

export const InfoContainer = props => {
  return (
    <GlobalStyles>
      <Container>{props.children}</Container>
    </GlobalStyles>
  )
}
