import { Shipping_order } from "__generated__/Shipping_order.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Placeholder } from "Styleguide/Utils/Placeholder"
import { Summary } from "../../Components/Summary"
import { TwoColumnLayout } from "../../Components/TwoColumnLayout"

export interface ShippingProps {
  order: Shipping_order
}

export class ShippingRoute extends Component<ShippingProps> {
  render() {
    // const { order } = this.props
    return (
      <TwoColumnLayout
        Content={<Placeholder height="460px" name="Content" />}
        Sidebar={<Summary />}
      />
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
