import Buttons from "../Buttons"
import Nav from "../Nav"
import React, { Component } from "react"
import Title from "../Title"
import styled from "styled-components"
import { StepMarker } from "../StepMarker"
import { storiesOf } from "@storybook/react"

storiesOf("Components/StepMarker", module)
  .add("Basic", () => {
    const steps = [
      {
        label: "Shipping",
        isActive: false,
        isComplete: false,
      },
      {
        label: "Payment",
        isActive: false,
        isComplete: false,
      },
      {
        label: "Review",
        isActive: false,
        isComplete: false,
      },
    ]

    return (
      <Container>
        <StepMarker steps={steps} />
      </Container>
    )
  })
  .add("Custom step index", () => {
    const steps = [
      {
        label: "Shipping",
        isActive: true,
        isComplete: false,
      },
      {
        label: "Payment",
        isActive: false,
        isComplete: false,
      },
      {
        label: "Review",
        isActive: true,
        isComplete: false,
      },
    ]

    return (
      <Container>
        <StepMarker steps={steps} />
      </Container>
    )
  })
  .add("With renderProps API", () => {
    const steps = [
      {
        label: "Shipping",
        isActive: false,
        isComplete: false,
      },
      {
        label: "Payment",
        isActive: false,
        isComplete: false,
      },
      {
        label: "Review",
        isActive: false,
        isComplete: false,
      },
    ]

    return (
      <Container>
        <StepMarker steps={steps}>
          {({ nextStep, previousStep, gotoStep, stepState }) => {
            console.warn("Step state: ", stepState)

            return (
              <NavButtons>
                <button onClick={() => nextStep()}>Next</button>
                <button onClick={() => previousStep()}>Previous</button>
                <button onClick={() => gotoStep(0)}>1st step</button>
                <button onClick={() => gotoStep(1)}>2st step</button>
                <button onClick={() => gotoStep(2)}>3st step</button>
              </NavButtons>
            )
          }}
        </StepMarker>
      </Container>
    )
  })
  .add("In app context", () => {
    const steps = [
      {
        label: "Shipping",
        isActive: false,
        isComplete: false,
      },
      {
        label: "Payment",
        isActive: false,
        isComplete: false,
      },
      {
        label: "Review",
        isActive: false,
        isComplete: false,
      },
    ]

    class App extends Component {
      handleNext
      handlePrevious

      render() {
        return (
          <Container>
            <Nav
              height={70}
              logoIcon="logotype"
              logoLink="https://www.artsy.net"
            >
              <Title titleSize="xsmall">Secure Checkout</Title>
              <Content>
                <StepMarker steps={steps}>
                  {({ nextStep, previousStep }) => {
                    this.handleNext = nextStep
                    this.handlePrevious = previousStep
                  }}
                </StepMarker>
              </Content>
            </Nav>

            <Buttons.InvertedButton onClick={() => this.handleNext()}>
              Next
            </Buttons.InvertedButton>
            <Buttons.InvertedButton onClick={() => this.handlePrevious()}>
              Previous
            </Buttons.InvertedButton>
          </Container>
        )
      }
    }

    return <App />
  })

const Container = styled.div`
  width: 100%;
`

const Content = styled.div`
  margin-top: 15px;
  width: 50%;
`

const NavButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  position: relative;
  right: 0;
`
