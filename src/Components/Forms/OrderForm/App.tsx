import Nav from "../../Nav"
import React, { Component } from "react"
import Title from "../../Title"
import compose from "lodash/fp/compose"
import styled from "styled-components"
import { PaymentForm } from "./Forms/PaymentForm"
import { Redirect, Route } from "react-router"
import { RenderProps as StepRenderProps } from "../../StepMarker"
import { ReviewForm } from "./Forms/ReviewForm"
import { ShippingForm } from "./Forms/ShippingForm"
import { StepMarker } from "../../StepMarker"
import { formikConfiguration } from "./formik"
import { withFormik } from "formik"
import { withRouter, RouteComponentProps } from "react-router"

export const forms = [
  {
    label: "Shipping",
    path: "/shipping",
    component: ShippingForm,
    isActive: false,
    isComplete: false,
  },
  {
    label: "Payment",
    path: "/payment",
    component: PaymentForm,
    isActive: false,
    isComplete: false,
  },
  {
    label: "Review",
    path: "/review",
    component: ReviewForm,
    isActive: false,
    isComplete: false,
  },
]

class Form extends Component<RouteComponentProps<any>> {
  stepper: StepRenderProps

  registerStepper = (stepper: StepRenderProps) => {
    this.stepper = stepper
  }

  gotoStep = path => {
    const formIndex = forms.findIndex(form => form.path === path)
    this.stepper.gotoStep(formIndex)
    this.props.history.push(path)
  }

  nextStep = path => {
    this.stepper.nextStep()

    setTimeout(() => {
      const { currentStep, steps } = this.stepper.stepState
      const step = steps[currentStep] as any

      if (step) {
        const nextStepPath = step.path
        this.props.history.push(nextStepPath)
      }
    })
  }

  render() {
    return (
      <Container>
        <Nav height={70} logoIcon="logotype" logoLink="https://www.artsy.net">
          <StyledTitle titleSize="xsmall">Secure Checkout</StyledTitle>

          <StepMarker style={{ marginTop: 15, marginRight: 15 }} steps={forms}>
            {stepper => {
              this.registerStepper(stepper)
            }}
          </StepMarker>
        </Nav>

        <Forms>
          <Redirect from="/" to="/shipping" />

          {forms.map(({ path, component: FormComponent }, key) => {
            return (
              <Route
                path={path}
                key={key}
                render={() => {
                  return (
                    <FormComponent
                      nextStep={() => this.nextStep(path)}
                      gotoStep={this.gotoStep}
                    />
                  )
                }}
              />
            )
          })}
        </Forms>
      </Container>
    )
  }
}

const Container = styled.div``

const Forms = styled.div`
  max-width: 540px;
  margin: 0 auto;
`

const StyledTitle = Title.extend`
  flex-grow: 1;
`

export const App = compose(withFormik(formikConfiguration), withRouter)(Form)
