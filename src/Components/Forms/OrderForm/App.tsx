// tslint:disable:jsx-key

import Nav from "../../Nav"
import React, { Component } from "react"
import Title from "../../Title"
import styled from "styled-components"
import { PaymentForm } from "./Forms/PaymentForm"
import { StepMarker } from "../../StepMarker"
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
              <StyledTitle titleSize="medium">Secure Checkout</StyledTitle>
              <StepMarker
                style={{ marginTop: 15, marginRight: 15 }}
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
const Container = styled.div`
  width: 768px;
`

export const StyledTitle = Title.extend`
  flex-grow: 1;
`
