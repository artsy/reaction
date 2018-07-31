import { Review_order } from "__generated__/Review_order.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Link } from "Router"
import { Button } from "Styleguide/Elements/Button"
import { Join } from "Styleguide/Elements/Join"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Placeholder } from "Styleguide/Utils/Placeholder"
import { Responsive } from "Utils/Responsive"
import { Summary } from "../../Components/Summary"
import { TwoColumnLayout } from "../../Components/TwoColumnLayout"

export interface ReviewProps {
  order: Review_order
  mediator?: {
    trigger: (action: string, config: object) => void
  }
}

export class ReviewRoute extends Component<ReviewProps> {
  render() {
    const { order } = this.props

    return (
      <Responsive>
        {({ xs }) => (
          <TwoColumnLayout
            Content={
              <>
                <Join separator={<Spacer mb={3} />}>
                  <Placeholder height="68px" name="Step summary item" />
                  <Placeholder height="68px" name="Step summary item" />
                  <Placeholder height="80px" name="Item review" />
                  <Placeholder height="20px" name="Terms and conditions" />
                  {!xs && (
                    <Link to={`/order2/${order.id}/summary`}>
                      <Button size="large" width="100%">
                        Submit Order
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
                    <Placeholder height="20px" name="Terms and conditions" />
                    <Spacer mb={3} />
                    <Link to={`/order2/${order.id}/summary`}>
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

export const ReviewFragmentContainer = createFragmentContainer(
  ReviewRoute,
  graphql`
    fragment Review_order on Order {
      id
    }
  `
)
