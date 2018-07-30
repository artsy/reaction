import React, { SFC } from "react"
import { Step, Stepper } from "Styleguide/Components/Stepper"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Spacer } from "Styleguide/Elements/Spacer"

export interface OrderAppProps {
  me: {
    name: string
  }
  params: {
    orderID: string
  }
  currentStepIndex: number
}

// @ts-ignore
export const OrderApp: SFC<OrderAppProps> = ({
  me,
  children,
  currentStepIndex,
}) => {
  return (
    <>
      <Row>
        <Col>
          <Stepper
            initialTabIndex={currentStepIndex}
            currentStepIndex={currentStepIndex}
          >
            <Step name="Shipping" />
            <Step name="Payment" />
            <Step name="Review" />
          </Stepper>
        </Col>
      </Row>

      <Spacer mb={3} />

      {children}
    </>
  )
}
