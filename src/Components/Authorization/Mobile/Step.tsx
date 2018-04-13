import React from "react"
import styled from "styled-components"

const Container = styled.div`
  padding: 10px;
`

export const Step = props => <Container>{props.children}</Container>
