import Nav from "../../Nav"
import React, { Component } from "react"
import Title from "../../Title"
import styled from "styled-components"
import { PaymentForm } from "./Forms/PaymentForm"
import { StepMarker, StepMarkerProps } from "../../StepMarker"
import { ReviewForm } from "./Forms/ReviewForm"
import { ShippingForm } from "./Forms/ShippingForm"
import { validationSchema } from "./formik"
import { Wizard, Step } from "../../Wizard/index"

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
              <StyledStepMarker
                style={{}}
                steps={wizard.steps.map(step => step.props)}
                currentStepIndex={wizard.currentStepIndex}
              />
            </Nav>
            {wizard.currentStep}
          </Container>
        )}
      </Wizard>
    )
  }
}

const StyledStepMarker = styled(StepMarker)`
  width: 300px;
  padding: 30px 0;
  margin-left: "auto";
  margin-right: 15;
  padding: 30px 22px 30px 0;
`

const Container = styled.div`
  width: 768px;
`

export const StyledTitle = Title.extend`
  font-weight: bold;
  flex-grow: 1;
`
