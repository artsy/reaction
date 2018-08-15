import { Sans, Serif } from "@artsy/palette"
import { Submission_order } from "__generated__/Submission_order.graphql"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Join } from "Styleguide/Elements/Join"
import { Message } from "Styleguide/Elements/Message"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Placeholder } from "Styleguide/Utils/Placeholder"
import { Responsive } from "Utils/Responsive"
import { ItemReviewFragmentContainer as ItemReview } from "../../Components/ItemReview"
import { SummaryFragmentContainer as Summary } from "../../Components/Summary"

export interface SubmissionProps {
  order: Submission_order
  mediator?: {
    trigger: (action: string, config: object) => void
  }
}

export class SubmissionRoute extends Component<SubmissionProps> {
  render() {
    const { order } = this.props

    return (
      <Responsive>
        {() => (
          <TwoColumnLayout
            Content={
              <>
                <Join separator={<Spacer mb={3} />}>
                  <>
                    <Serif size="6" weight="regular" color="black100">
                      Your order has been submitted
                    </Serif>
                    <Sans size="2" weight="regular" color="black60">
                      Order #{order.code}
                    </Sans>
                    <Message mt={3}>
                      Thank you for your order. You’ll receive a confirmation
                      email shortly. If you have questions, please contact{" "}
                      <a href="#">orders@artsy.net</a>.
                    </Message>
                  </>
                  <Responsive>
                    {({ xs }) =>
                      !xs && (
                        <div>
                          <ItemReview
                            artwork={
                              this.props.order.lineItems.edges[0].node.artwork
                            }
                          />
                        </div>
                      )
                    }
                  </Responsive>
                  <Placeholder height="80px" name="Price Summary" />
                </Join>
                <Spacer mb={3} />
              </>
            }
            Sidebar={<Summary mediator={this.props.mediator} order={order} />}
          />
        )}
      </Responsive>
    )
  }
}

export const SubmissionFragmentContainer = createFragmentContainer(
  SubmissionRoute,
  graphql`
    fragment Submission_order on Order {
      id
      code
      ...Summary_order
      lineItems {
        edges {
          node {
            artwork {
              ...ItemReview_artwork
            }
          }
        }
      }
    }
  `
)
