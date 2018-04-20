import { storiesOf } from "@storybook/react"
import React from "react"
import styled from "styled-components"
import { StepMarker } from "../Wizard/StepMarker"
const steps = [
  {
    label: "Shipping",
  },
  {
    label: "Payment",
  },
  {
    label: "Review",
  },
]
storiesOf("Components/StepMarker", module).add("Basic", () => {
  return (
    <Container>
      <StepMarker steps={steps} currentStepIndex={1} />
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
`
