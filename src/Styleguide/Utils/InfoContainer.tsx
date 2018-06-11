import React from "react"
import styled from "styled-components"

const Container = styled.div`
  padding: 40px;
`

export const InfoContainer = props => {
  return <Container>{props.children}</Container>
}
