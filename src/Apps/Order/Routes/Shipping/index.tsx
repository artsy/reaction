import { Shipping_order } from "__generated__/Shipping_order.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Join } from "Styleguide/Elements/Join"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Placeholder } from "Styleguide/Utils/Placeholder"
import { Summary } from "../../Components/Summary"
import {
  TwoColumnLayout,
  TwoColumnSplit,
} from "../../Components/TwoColumnLayout"

export interface ShippingProps {
  order: Shipping_order
  mediator?: {
    trigger: (action: string, config: object) => void
  }
}

export class ShippingRoute extends Component<ShippingProps> {
  render() {
    // const { order } = this.props
    return (
      <TwoColumnLayout
        Content={
          <>
            <Placeholder height="180px" name="Radio Group" mb={3} />
            <Join separator={<Spacer mb={2} />}>
              <Placeholder height="68px" name="Full Name" />
              <TwoColumnSplit>
                <Placeholder height="68px" name="Country" />
                <Placeholder height="68px" name="Postal Code" />
              </TwoColumnSplit>
              <TwoColumnSplit>
                <Placeholder height="68px" name="Address Line 1" />
                <Placeholder height="68px" name="Address Line 2 (optional)" />
              </TwoColumnSplit>
              <TwoColumnSplit>
                <Placeholder height="68px" name="City" />
                <Placeholder height="68px" name="State, province, or region" />
              </TwoColumnSplit>
            </Join>
            <Spacer mb={3} />
          </>
        }
        Sidebar={<Summary mediator={this.props.mediator} />}
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
