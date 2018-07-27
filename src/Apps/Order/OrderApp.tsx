import React, { SFC } from "react"
import { Step, Stepper } from "Styleguide/Components/Stepper"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"

export interface OrderAppProps {
  me: {
    name: string
  }
  params: {
    orderID: string
  }
}

// @ts-ignore
export const OrderApp: SFC<OrderAppProps> = ({ me, children, order }) => {
  return (
    <>
      <Row>
        <Col>
          <Stepper currentStepIndex={0}>
            <Step name="Shipping" />
            <Step name="Payment" />
            <Step name="Review" />
          </Stepper>
        </Col>
      </Row>

      <Spacer mb={3} />

      {children}

      {me && (
        <>
          <Separator my={6} />
          {me.name}
        </>
      )}
    </>
  )
}
