import { Shipping_order } from "__generated__/Shipping_order.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Link } from "Router"
import { Button } from "Styleguide/Elements/Button"
import { Join } from "Styleguide/Elements/Join"
import { RadioGroup } from "Styleguide/Elements/RadioGroup"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Placeholder } from "Styleguide/Utils/Placeholder"
import { Responsive } from "Utils/Responsive"
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
    const { order } = this.props
    return (
      <Responsive>
        {({ xs }) => (
          <TwoColumnLayout
            Content={
              <>
                <RadioGroup
                  onSelect={id => id}
                  options={[
                    { label: "Provide shipping address", id: "SHIP" },
                    { label: "Arrange for pickup", id: "PICKUP" },
                  ]}
                />
                <Spacer mb={3} />
                <Join separator={<Spacer mb={2} />}>
                  <Placeholder height="68px" name="Full Name" />
                  <TwoColumnSplit>
                    <Placeholder height="68px" name="Country" />
                    <Placeholder height="68px" name="Postal Code" />
                  </TwoColumnSplit>
                  <TwoColumnSplit>
                    <Placeholder height="68px" name="Address Line 1" />
                    <Placeholder
                      height="68px"
                      name="Address Line 2 (optional)"
                    />
                  </TwoColumnSplit>
                  <TwoColumnSplit>
                    <Placeholder height="68px" name="City" />
                    <Placeholder
                      height="68px"
                      name="State, province, or region"
                    />
                  </TwoColumnSplit>
                  {!xs && (
                    <Link to={`/order2/${order.id}/payment`}>
                      <Button size="large" width="100%">
                        Continue
                      </Button>
                    </Link>
                  )}
                </Join>
                <Spacer mb={3} />
              </>
            }
            Sidebar={
              <Summary mediator={this.props.mediator}>
                {xs && (
                  <>
                    <Spacer mb={3} />
                    <Link to={`/order2/${order.id}/payment`}>
                      <Button size="large" width="100%">
                        Continue
                      </Button>
                    </Link>
                  </>
                )}
              </Summary>
            }
          />
        )}
      </Responsive>
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
