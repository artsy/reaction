import React, { SFC } from "react"
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
    <React.Fragment>
      <Row>
        <Col>
          <div>This is the Order App!</div>
        </Col>
      </Row>

      <Spacer mb={3} />
      {children}

      <Row>
        <Col>
          <span id="jumpto-RouteTabs" />

          <Spacer mb={3} />
        </Col>
      </Row>

      {me && (
        <React.Fragment>
          <Separator my={6} />
          {me.name}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
