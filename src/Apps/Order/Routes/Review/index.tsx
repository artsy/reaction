import { Review_order } from "__generated__/Review_order.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Link } from "Router"
import { Button } from "Styleguide/Elements/Button"
import { Spacer } from "Styleguide/Elements/Spacer"

export interface ReviewProps {
  order: Review_order
}

export class ReviewRoute extends Component<ReviewProps> {
  render() {
    const { order } = this.props

    return (
      <React.Fragment>
        Review Page
        <Spacer mb={1} />
        {`Order #${order.id}`}
        <Spacer mb={2} />
        <Link to={`/order2/${order.id}/submission`}>
          <Button variant="primaryBlack" size="medium" m={0.5}>
            Go to submission page
          </Button>
        </Link>
      </React.Fragment>
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
