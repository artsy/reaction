import { Sans, Serif } from "@artsy/palette"
import { Submission_order } from "__generated__/Submission_order.graphql"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Flex } from "Styleguide/Elements/Flex"
import { Join } from "Styleguide/Elements/Join"
import { Message } from "Styleguide/Elements/Message"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Placeholder } from "Styleguide/Utils/Placeholder"
import { Responsive } from "Utils/Responsive"
import { Helper } from "../../Components/Helper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "../../Components/TransactionSummary"

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
        {({ xs }) => (
          <TwoColumnLayout
            Content={
              <>
                <Join separator={<Spacer mb={xs ? 2 : 3} />}>
                  <>
                    <Serif size="6" weight="regular" color="black100">
                      Your order has been submitted
                    </Serif>
                    <Sans size="2" weight="regular" color="black60">
                      Order #{order.code}
                    </Sans>
                    <Message mt={xs ? 2 : 3}>
                      Thank you for your order. You’ll receive a confirmation
                      email shortly. If you have questions, please contact{" "}
                      <a href="#">orders@artsy.net</a>.
                    </Message>
                  </>
                  <TransactionSummary order={order} />
                </Join>
                <Spacer mb={xs ? 2 : 3} />
              </>
            }
            Sidebar={
              <Flex flexDirection="column">
                <Placeholder
                  height="180px"
                  name="Shipping and payment details"
                  mb={xs ? 2 : 3}
                />
                <Helper artworkId={order.lineItems.edges[0].node.artwork.id} />
              </Flex>
            }
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
      ...TransactionSummary_order
      lineItems {
        edges {
          node {
            artwork {
              id
              ...ItemReview_artwork
            }
          }
        }
      }
    }
  `
)
