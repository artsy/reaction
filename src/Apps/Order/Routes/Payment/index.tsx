import { Payment_order } from "__generated__/Payment_order.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Link } from "Router"
import { Button } from "Styleguide/Elements/Button"
import { Spacer } from "Styleguide/Elements/Spacer"

export interface PaymentProps {
  order: Payment_order
}

export class PaymentRoute extends Component<PaymentProps> {
  render() {
    const { order } = this.props

    return (
      <React.Fragment>
        Payment Page
        <Spacer mb={1} />
        {`Order #${order.id}`}
        <Spacer mb={2} />
        <Link to={`/order2/${order.id}/review`}>
          <Button variant="primaryBlack" size="medium" m={0.5}>
            Go to review page
          </Button>
        </Link>
      </React.Fragment>
    )
  }
}

export const PaymentFragmentContainer = createFragmentContainer(
  PaymentRoute,
  graphql`
    fragment Payment_order on Order {
      id
    }
  `
)
