import React from "react"
import styled from "styled-components"
import { StepMarker } from "../StepMarker"

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

const Container = styled.div`
  width: 100%;
`

const NavButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`
