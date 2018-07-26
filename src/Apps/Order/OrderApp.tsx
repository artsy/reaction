import React, { SFC } from "react"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Placeholder } from "Styleguide/Utils/Placeholder"

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
          <Placeholder name="Subheader" height="46px" />
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
