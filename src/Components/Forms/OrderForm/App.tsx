import React, { Component } from "react"
import styled from "styled-components"
import Nav from "../../Nav"
import { StepMarker } from "../../StepMarker"
import Title from "../../Title"
import { Step, Wizard } from "../../Wizard/index"
import { validationSchema } from "./formik"
import { PaymentForm } from "./Forms/PaymentForm"
import { ReviewForm } from "./Forms/ReviewForm"
import { ShippingForm } from "./Forms/ShippingForm"

export const forms = [
  <Step validationSchema={validationSchema.shipping} label="Shipping">
    {ShippingForm}
  </Step>,
  <Step validationSchema={validationSchema.payment} label="Payment">
    {PaymentForm}
  </Step>,
  <Step validationSchema={validationSchema.review} label="Review">
    {ReviewForm}
  </Step>,
]

export class App extends Component<{ onSubmit: any }> {
  render() {
    return (
      <Wizard onComplete={this.props.onSubmit} steps={forms}>
        {({ wizard, form }) => (
          <Container>
            <Nav>
              <StyledTitle titleSize="small">Secure Checkout</StyledTitle>
              <StepMarkerContainer>
                <StepMarker
                  style={{ padding: "30px 5px" }}
                  steps={wizard.steps.map(step => step.props)}
                  currentStepIndex={wizard.currentStepIndex}
                />
              </StepMarkerContainer>
            </Nav>
            <StepContainer>{wizard.currentStep}</StepContainer>
          </Container>
        )}
      </Wizard>
    )
  }
}

const StepMarkerContainer = styled.div`
  width: 300px;
`

const Container = styled.div`
  width: 100%;
  min-width: 768px;
`

const StepContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`

export const StyledTitle = Title.extend`
  font-weight: bold;
  flex-grow: 1;
`
