import React, { SFC } from "react"
import { Step, Stepper } from "Styleguide/Components/Stepper"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Spacer } from "Styleguide/Elements/Spacer"

const steps = ["Shipping", "Payment", "Review"]

const getStepIndex = pathname =>
  steps.findIndex(step => pathname.includes(step.toLowerCase()))

export interface OrderAppProps {
  me: {
    name: string
  }
  params: {
    orderID: string
  }
  location: any
}

export const OrderApp: SFC<OrderAppProps> = ({
  me,
  children,
  location,
  ...props
}) => {
  const stepIndex = getStepIndex(location.pathname)
  return (
    <>
      <Row>
        <Col>
          <Stepper initialTabIndex={stepIndex} currentStepIndex={stepIndex}>
            {steps.map(step => <Step name={step} key={step} />)}
          </Stepper>
        </Col>
      </Row>

      <Spacer mb={3} />

      {children}
    </>
  )
}
