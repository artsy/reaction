import React, { Component } from "react"
import styled from "styled-components"

interface Props {}

export class OrderForm extends Component<Props> {
  render() {
    return <Container>hi order form</Container>
  }
}

const Container = styled.div`
  border: 1px solid green;
`
