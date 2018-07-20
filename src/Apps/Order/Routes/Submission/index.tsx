import { Submission_order } from "__generated__/Submission_order.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Spacer } from "Styleguide/Elements/Spacer"

export interface SubmissionProps {
  order: Submission_order
}

export class SubmissionRoute extends Component<SubmissionProps> {
  render() {
    const { order } = this.props

    return (
      <React.Fragment>
        Submission Page
        <Spacer mb={1} />
        {`Order #${order.id}`}
        <Spacer mb={2} />
        Submitted!
      </React.Fragment>
    )
  }
}

export const SubmissionFragmentContainer = createFragmentContainer(
  SubmissionRoute,
  graphql`
    fragment Submission_order on Order {
      id
    }
  `
)
