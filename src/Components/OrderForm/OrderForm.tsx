import React, { Component } from "react"
import styled from "styled-components"
import { MemoryRouter } from "react-router"
import { Route } from "react-router"

interface Props {}

export class OrderForm extends Component<Props> {
  render() {
    return (
      <MemoryRouter>
        <Container>
          <Route
            exact
            path="/"
            render={props => {
              return <div>HI!</div>
            }}
          />
          <Route
            path={`/a`}
            render={props => {
              return <div>Order Route A</div>
            }}
          />
          <Route
            path={`/b`}
            render={props => {
              return <div>Order Route B</div>
            }}
          />
        </Container>
      </MemoryRouter>
    )
  }
}

const Container = styled.div`
  border: 1px solid green;
`
