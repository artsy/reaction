import { Shipping_order } from "__generated__/Shipping_order.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Spacer } from "Styleguide/Elements/Spacer"

export interface ShippingProps {
  order: Shipping_order
}

export class ShippingRoute extends Component<ShippingProps> {
  render() {
    const { order } = this.props

    return (
      <React.Fragment>
        I am on the shipping route!
        <Spacer mb={1} />
        {`Order #: ${order.id}`}
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
