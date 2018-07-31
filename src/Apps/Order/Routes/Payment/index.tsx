import { Payment_order } from "__generated__/Payment_order.graphql"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Link } from "Router"
import { Button } from "Styleguide/Elements/Button"
import { Join } from "Styleguide/Elements/Join"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Placeholder } from "Styleguide/Utils/Placeholder"
import { Responsive } from "Utils/Responsive"
import { Summary } from "../../Components/Summary"

export interface PaymentProps {
  order: Payment_order
  mediator?: {
    trigger: (action: string, config: object) => void
  }
}

export class PaymentRoute extends Component<PaymentProps> {
  render() {
    const { order } = this.props
    return (
      <Responsive>
        {({ xs }) => (
          <TwoColumnLayout
            Content={
              <>
                <Join separator={<Spacer mb={3} />}>
                  <Placeholder height="68px" name="Credit Card" />
                  <Placeholder height="20px" name="Billing/Shipping Check" />
                  {!xs && (
                    <Link to={`/order2/${order.id}/review`}>
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
                    <Link to={`/order2/${order.id}/review`}>
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

export const PaymentFragmentContainer = createFragmentContainer(
  PaymentRoute,
  graphql`
    fragment Payment_order on Order {
      id
    }
  `
)
