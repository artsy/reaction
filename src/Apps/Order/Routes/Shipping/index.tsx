import { Shipping_order } from "__generated__/Shipping_order.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Link } from "Router"
import { Button } from "Styleguide/Elements/Button"
import { Spacer } from "Styleguide/Elements/Spacer"

export interface ShippingProps {
  order: Shipping_order
}

export class ShippingRoute extends Component<ShippingProps> {
  render() {
    const { order } = this.props

    return (
      <React.Fragment>
        Shipping page
        <Spacer mb={1} />
        {`Order #${order.id}`}
        <Spacer mb={2} />
        <Link to={`/order2/${order.id}/payment`}>
          <Button variant="primaryBlack" size="medium" m={0.5}>
            Go to payment page
          </Button>
        </Link>
      </React.Fragment>
    )
  }
}

export const ShippingFragmentContainer = createFragmentContainer(
  ShippingRoute,
  graphql`
    fragment Shipping_order on Order {
      id
    }
  `
)
